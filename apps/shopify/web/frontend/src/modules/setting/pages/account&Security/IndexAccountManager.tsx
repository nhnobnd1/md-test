import { useJob, useToggle } from "@moose-desk/core";
import { AccessManger, UserSettingRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  Card,
  FormLayout,
  Link,
  SkeletonBodyText,
  Stack,
  Tag,
  Text,
} from "@shopify/polaris";
import classNames from "classnames";
import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import Switch from "src/components/Switch/Switch";
import { useSubdomain } from "src/hooks/useSubdomain";
import InputDisableSubmit from "src/modules/setting/component/InputDisableSubmit/InputDisableSubmit";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
import { object, string } from "yup";
import styles from "./styles.module.scss";

const initialValues = {
  autoJoinEnabled: false,
  whitelistDomains: [],
  twoFactorAuthEnabled: false,
  domain: "",
};
export default function IndexAccountManager({ props }: any) {
  const { getSubDomain } = useSubdomain();
  const { toggle } = useToggle();
  const getLinkSignUp = useCallback(
    (mode: string) => {
      const subDomain = getSubDomain() || "";
      if (subDomain) {
        switch (mode) {
          case "development":
            return `https://${subDomain.toLocaleLowerCase()}.moosedesk.net/signup`;
          case "staging":
            return `https://${subDomain.toLocaleLowerCase()}.moosedesk.com/signup`;
          case "production":
            return `https://${subDomain.toLocaleLowerCase()}.moosedesk.com/signup`;
          default:
            break;
        }
      }
    },
    [import.meta.env.MODE, getSubDomain]
  );

  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const removeSelectedDomain = useCallback(
    (domain) => () => {
      if (!disabled) {
        setSelectedDomain((previousDomain) =>
          previousDomain.filter((previousDomain) => previousDomain !== domain)
        );
      }
    },
    [disabled, setDisabled]
  );
  const selectedMarkup = selectedDomain.map((domain) => (
    <Tag key={domain} onRemove={removeSelectedDomain(domain)}>
      {domain}
    </Tag>
  ));
  const { show } = useToast();
  const { t, i18n } = useTranslation();

  const [banner, setBanner] = useState<BannerPropsAccessManager>({
    status: "success",
    message: "",
    isShowBanner: false,
  });

  const formRef = useRef<FormikProps<any>>(null);
  const validateObject = useCallback(() => {
    if (formRef.current?.values.autoJoinEnabled) {
      if (selectedDomain.length === 0) {
        return object().shape({
          domain: string()
            .matches(
              /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
              "The input email domain is not valid!"
            )
            .required("The email domain is required!"),
        });
      } else {
        return object().shape({
          domain: string().matches(
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
            "The input email domain is not valid!"
          ),
        });
      }
    } else {
      return object().shape({});
    }
  }, [
    formRef.current?.values.autoJoinEnabled,
    selectedDomain,
    setSelectedDomain,
  ]);
  // fetch init data
  const {
    run: fetchAccountManagerStatus,
    result,
    processing,
  } = useJob(
    () => {
      return UserSettingRepository()
        .getAccessManagerSetting()
        .pipe(
          map(({ data }) => {
            setSelectedDomain(data.data.whitelistDomains);
            setDisabled(!data.data.autoJoinEnabled);
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  // update data
  const handleSubmit = useCallback(
    (data: any) => {
      const dataSubmit = { ...data, whitelistDomains: selectedDomain };
      submit(dataSubmit);
    },
    [selectedDomain]
  );
  const { run: submit, processing: submitting } = useJob(
    (dataSubmit: AccessManger) => {
      return UserSettingRepository()
        .updateAccessManagerSetting(dataSubmit)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              show(t("messages:success.update_access_manager"));
              setBanner({
                isShowBanner: true,
                message: t("messages:success.update_access_manager"),
                status: "success",
              });
              fetchAccountManagerStatus();
            } else {
              if (data.statusCode === 409) {
                setBanner({
                  isShowBanner: true,
                  message: t("messages:error.update_access_manager"),
                  status: "critical",
                });
              } else {
                setBanner({
                  isShowBanner: true,
                  message: t("messages:error.update_access_manager"),
                  status: "critical",
                });
                show(t("messages:error.update_access_manager"), {
                  isError: true,
                });
              }
            }
          }),
          catchError((error) => {
            if (error.response.status === 409) {
              setBanner({
                isShowBanner: true,
                message: t("messages:error.update_access_manager"),
                status: "critical",
              });
              show(`Domains cannot be the same.`, {
                isError: true,
              });
            } else {
              setBanner({
                isShowBanner: true,
                message: "`Domains cannot be the same.`",
                status: "critical",
              });
              show(t("messages:error.update_access_manager"), {
                isError: true,
              });
            }
            return of(error);
          })
        );
    }
  );
  // handle submit form

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  // reset form
  const handleResetForm = () => {
    formRef.current?.resetForm();
    fetchAccountManagerStatus();
  };
  //
  useEffect(() => {
    fetchAccountManagerStatus();
    getLinkSignUp(import.meta.env.MODE);
  }, []);
  return (
    <section className="page-wrap">
      <div className={styles.pageContent}>
        <Text variant="headingLg" as="h1">
          Access Manager
        </Text>
        <div className={styles.wrapForm}>
          <Card sectioned>
            <Form
              initialValues={result || initialValues}
              ref={formRef}
              validationSchema={validateObject}
              onValuesChange={toggle}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              <FormLayout>
                {/* <Layout> */}
                {banner.isShowBanner ? (
                  // <Layout.Section>
                  <Banner
                    status={banner.status}
                    onDismiss={() =>
                      setBanner({ ...banner, isShowBanner: false })
                    }
                  >
                    {banner.message}
                  </Banner>
                ) : // </Layout.Section>
                null}
                {/* <Layout.Section> */}
                <Text as="h2" variant="headingMd">
                  Auto-Join Settings
                </Text>
                {processing ? (
                  <>
                    <br />
                    <SkeletonBodyText lines={3} />
                    <br />
                  </>
                ) : (
                  <div className={styles.wrapFormAndToggle}>
                    <FormItem name="autoJoinEnabled">
                      <Switch onClick={() => setDisabled(!disabled)} />
                    </FormItem>

                    <div className={styles.note}>
                      <Text variant="bodyMd" as="span">
                        Allow users with email addresses from an approved email
                        domain to use the sign up link.
                      </Text>
                      <br />
                      <Link> {getLinkSignUp(import.meta.env.MODE)}</Link>
                    </div>
                  </div>
                )}

                <div className={styles.domainForm}>
                  <div className={styles.labels}>
                    <Text variant="bodyMd" as="span">
                      Email domain:
                    </Text>
                  </div>

                  {processing ? (
                    <>
                      <br />
                      <SkeletonBodyText lines={1} />
                    </>
                  ) : (
                    <FormItem name="domain">
                      <InputDisableSubmit
                        inititalValue={selectedDomain}
                        setValue={setSelectedDomain}
                        disabled={disabled}
                      />
                    </FormItem>
                  )}
                </div>
                <div className="mt-2">
                  <FormItem name="whitelistDomains">
                    <Stack spacing="tight">{selectedMarkup}</Stack>
                  </FormItem>
                </div>
                {/* </Layout.Section> */}

                {/* <Layout.Section> */}
                <Text as="h2" variant="headingMd">
                  Two-Factor Authentication (2FA)
                </Text>
                {processing ? (
                  <>
                    <br />
                    <SkeletonBodyText lines={1} />
                  </>
                ) : (
                  <div
                    className={classNames(
                      styles.wrapFormAndToggle,
                      "align-center"
                    )}
                  >
                    <FormItem name="twoFactorAuthEnabled">
                      <Switch />
                    </FormItem>

                    <div className={styles.note}>
                      <Text variant="bodyMd" as="span">
                        Toggle 2FA for all users
                      </Text>
                    </div>
                  </div>
                )}
                {/* </Layout.Section> */}
                {/* </Layout> */}
                <FormItem name="whitelistDomains"></FormItem>
              </FormLayout>
            </Form>
            <div className={styles.groupButton}>
              <Button onClick={handleResetForm}>Cancel</Button>
              <Button
                primary
                onClick={handleSubmitForm}
                loading={submitting}
                disabled={!formRef.current?.dirty}
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
