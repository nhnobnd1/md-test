import { TokenManager, useJob, useMount, useToggle } from "@moose-desk/core";
import { Agent, AgentRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  BannerStatus,
  Card,
  ContextualSaveBar,
  Layout,
  LegacyCard,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  TextContainer,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import * as jose from "jose";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();

  const { run: fetDetailsProfile, processing } = useJob(
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
              message: t("messages:success.update_profile"),
            });
            show(t("messages:success.update_profile"));
            setDataProfile(data.data);
          } else {
            setBanner({
              isShow: true,
              type: "critical",
              message: t("messages:error.update_profile"),
            });
            show(t("messages:error.update_profile"), {
              isError: true,
            });
          }
        }),
        catchError((error) => {
          setBanner({
            isShow: true,
            type: "critical",
            message: t("messages:error.update_profile"),
          });
          show(t("messages:error.update_profile"), {
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
      {formRef.current?.dirty && (
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
      {processing ? (
        <>
          <Page fullWidth>
            <Layout>
              <Layout.Section>
                <LegacyCard sectioned>
                  <TextContainer>
                    <SkeletonDisplayText size="extraLarge" />
                    <SkeletonBodyText />
                  </TextContainer>
                </LegacyCard>
              </Layout.Section>
            </Layout>
          </Page>
        </>
      ) : (
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
      )}
    </>
  );
}
