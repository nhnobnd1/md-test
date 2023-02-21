import { TokenManager, useJob, useMount, useToggle } from "@moose-desk/core";
import { Agent, AgentRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Card,
  ContextualSaveBar,
  Layout,
  Page,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import * as jose from "jose";
import { useCallback, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import ProfileForm from "src/modules/setting/component/ProfileForm";

export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token") ?? "");

  const formRef = useRef<FormikProps<any>>(null);
  const { toggle: updateForm } = useToggle();
  const initialValuesForm = useMemo<any>(() => {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
  }, []);
  const [dataProfile, setDataProfile] = useState<Agent>();
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

  const { run: fetDetailsProfile } = useJob(
    (payload: string) => {
      return AgentRepository()
        .getOne(payload)
        .pipe(
          map(({ data }) => {
            setDataProfile(data.data);
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  const { run: submit, processing: loading } = useJob((dataSubmit: any) => {
    const { _id } = dataSubmit;
    return AgentRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setBanner({
              isShow: true,
              type: "success",
              message: "Your Profile has been updated succcesfully.",
            });
            show("Your Profile has been updated succcesfully.");
            setDataProfile(data.data);
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: "Your Profile has been updated failed.",
            });
            show("Your Profile has been updated failed.", {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          setBanner({
            isShow: true,
            type: "critical",
            message: "Your Profile has been updated failed.",
          });
          show("Your Profile has been updated failed.", {
            isError: true,
          });
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
    <ProfileForm
      ref={formRef}
      updateForm={updateForm}
      initialValues={dataProfile || initialValuesForm}
      submit={submit}
    />
  );

  useMount(() => fetDetailsProfile(token.sub ?? ""));

  return (
    <>
      {!formRef.current?.dirty ? null : (
        <ContextualSaveBar
          fullWidth
          message="Unsaved changes"
          saveAction={{
            onAction: handleSubmitForm,
            disabled: !formRef.current?.dirty,
            loading: loading,
          }}
          discardAction={{
            onAction: handleResetForm,
          }}
        />
      )}
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
        </Layout>
      </Page>
    </>
  );
}
