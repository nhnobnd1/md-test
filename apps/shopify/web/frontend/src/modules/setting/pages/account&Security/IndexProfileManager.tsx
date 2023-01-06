import { TokenManager, useJob, useMount } from "@moose-desk/core";
import { AgentRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Button,
  ButtonGroup,
  Card,
  Layout,
  Page,
  Stack,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import * as jose from "jose";
import { useCallback, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import ProfileForm from "src/modules/setting/component/ProfileForm";

export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token"));
  console.log(TokenManager.getToken("base_token"));

  const formRef = useRef<FormikProps<any>>(null);
  const [banner, setBanner] = useState<{
    isShow: boolean;
    type: BannerStatus;
    message: string;
  }>({
    isShow: false,
    type: "success",
    message: "",
  });
  const { show } = useToast();
  const { run: fetDetailsProfile, result } = useJob(
    (payload: string) => {
      return AgentRepository.getOne(payload).pipe(
        map(({ data }) => {
          return data.data;
        })
      );
    },
    { showLoading: false }
  );
  const { run: submit } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return AgentRepository.update(_id, dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          setBanner({
            isShow: true,
            type: "success",
            message: "Profile has been updated succcesfully.",
          });
          show("Edit profile success");
        } else {
          if (data.statusCode === 409) {
            setBanner({
              isShow: true,
              type: "critical",
              message: `Email is ${dataSubmit.email} already exists.`,
            });
            show(`Email is ${dataSubmit.email} already exists.`, {
              isError: true,
            });
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: "Profile has been updated failed.",
            });
            show("Profile has been updated failed.", {
              isError: true,
            });
          }
        }
      }),
      catchError((error) => {
        if (error.response.status === 409) {
          setBanner({
            isShow: true,
            type: "critical",
            message: `Email is ${dataSubmit.email} already exists.`,
          });
          show(`Email is ${dataSubmit.email} already exists.`, {
            isError: true,
          });
        } else {
          setBanner({
            isShow: true,
            type: "critical",
            message: "Profile has been updated failed.",
          });
          show("Profile has been updated failed.", {
            isError: true,
          });
        }
        return of(error);
      })
    );
  });
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);

  const handleResetForm = useCallback(() => {
    formRef.current?.resetForm();
  }, [formRef.current]);

  const profileProfile = (
    <ProfileForm ref={formRef} initialValues={result} submit={submit} />
  );
  useMount(() => fetDetailsProfile(token.sub ?? ""));
  return (
    <>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            {banner.isShow ? (
              <Banner
                status={banner.type}
                onDismiss={() => setBanner({ ...banner, isShow: false })}
              >
                {banner.message}
              </Banner>
            ) : null}
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>{profileProfile}</Card>
          </Layout.Section>
          <Layout.Section fullWidth>
            <Stack distribution="trailing">
              <ButtonGroup>
                <Button onClick={handleResetForm}>Cancel</Button>
                <Button onClick={handleSubmitForm} primary>
                  Save
                </Button>
              </ButtonGroup>
            </Stack>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
