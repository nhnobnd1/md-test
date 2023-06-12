import { TokenManager, useJob, useToggle } from "@moose-desk/core";
import { Agent, AgentRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Banner, BannerStatus, Button, Card, Text } from "@shopify/polaris";
import { FormikProps } from "formik";
import * as jose from "jose";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { catchError, map, of } from "rxjs";
import SkeletonForm from "src/components/Skelaton/SkeletonForm";
import { getProfile } from "src/modules/setting/api/api";
import ProfileForm from "src/modules/setting/component/ProfileForm";
import styles from "./styles.module.scss";
const initialValuesForm: any = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token") ?? "");
  const formRef = useRef<FormikProps<any>>(null);
  const { toggle: updateForm } = useToggle();
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
  const { isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile", token?.sub],
    queryFn: () => getProfile(token?.sub ?? ""),
    onSuccess: (data: any) => {
      setDataProfile(data?.data?.data);
    },
    enabled: !!token?.sub,
  });
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
          }
          // else {
          //   setBanner({
          //     isShow: true,
          //     type: "critical",
          //     message: t("messages:error.update_profile"),
          //   });
          //   show(t("messages:error.update_profile"), {
          //     isError: true,
          //   });
          // }
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
    <>
      <ProfileForm
        ref={formRef}
        updateForm={updateForm}
        initialValues={dataProfile || initialValuesForm}
        submit={submit}
      />
      <div className={styles.groupButton}>
        <Button onClick={handleResetForm}>Cancel</Button>
        <Button
          primary
          onClick={handleSubmitForm}
          loading={loading}
          disabled={!formRef.current?.dirty}
        >
          Save
        </Button>
      </div>
    </>
  );

  return (
    <section className="page-wrap">
      <div className={styles.pageContent}>
        <Text variant="headingLg" as="h1">
          Profile
        </Text>
        <div className={styles.wrapForm}>
          {isLoadingProfile ? (
            <SkeletonForm
              noHeading
              listLabels={["First name", "Last name", "Email", "Phone"]}
            />
          ) : (
            <>
              {banner.isShow ? (
                <Banner
                  status={banner.type}
                  onDismiss={() => setBanner({ ...banner, isShow: false })}
                >
                  {banner.message}
                </Banner>
              ) : null}

              <Card sectioned>{profileProfile}</Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
