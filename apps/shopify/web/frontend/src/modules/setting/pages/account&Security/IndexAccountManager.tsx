import { useToggle } from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  Card,
  FormLayout,
  SkeletonBodyText,
  Stack,
  Tag,
  Text,
} from "@shopify/polaris";
import classNames from "classnames";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import Switch from "src/components/Switch/Switch";
import { useSubdomain } from "src/hooks/useSubdomain";
import {
  getSettingManager,
  updateSettingManager,
} from "src/modules/setting/api/api";
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
              /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?:\.|$)){2,}$/,
              "The input email domain is not valid!"
            )
            .required("The email domain is required!"),
        });
      } else {
        return object().shape({
          domain: string().matches(
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?:\.|$)){2,}$/,
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
    data: accountData,
    isLoading,
    isFetching,
    refetch: refetchAccountData,
  } = useQuery({
    queryKey: [QUERY_KEY.ACCOUNT_MANAGE],
    queryFn: () => getSettingManager(),
    keepPreviousData: true,
    onSuccess: ({ data }) => {
      setSelectedDomain(data.data.whitelistDomains);
      setDisabled(!data.data.autoJoinEnabled);
    },
  });
  const { mutate: updateAccountMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: any) => updateSettingManager(payload),
    onSuccess: async () => {
      await refetchAccountData();
      show(t("messages:success.update_access_manager"));
      setBanner({
        isShowBanner: true,
        message: t("messages:success.update_access_manager"),
        status: "success",
      });
    },
    onError: () => {
      setBanner({
        isShowBanner: true,
        message: t("messages:error.update_access_manager"),
        status: "critical",
      });
      show(`Domains cannot be the same.`, {
        isError: true,
      });
    },
  });
  // update data
  const handleSubmit = useCallback(
    (data: any) => {
      const dataSubmit = {
        ...data,
        whitelistDomains: selectedDomain,
        autoJoinEnabled: false,
      };
      updateAccountMutate(dataSubmit);
    },
    [selectedDomain]
  );

  // handle submit form

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);
  // reset form
  const handleResetForm = () => {
    formRef.current?.resetForm();
    refetchAccountData();
  };
  //
  useEffect(() => {
    getLinkSignUp(import.meta.env.MODE);
  }, []);
  const accountFormValues = useMemo(() => {
    return accountData?.data?.data;
  }, [accountData]);
  return (
    <section className="page-wrap">
      <div className={styles.pageContent}>
        <Text variant="headingLg" as="h1">
          Access Manager
        </Text>
        <div className={styles.wrapForm}>
          <Card sectioned>
            <Form
              initialValues={accountFormValues || initialValues}
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
                {/* <Text as="h2" variant="headingMd">
                  Auto-Join Settings
                </Text> */}
                {/* {isLoading ? (
                  <div>
                    <br />
                    <SkeletonBodyText lines={3} />
                    <br />
                  </div>
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
                )} */}

                {/* <div className={styles.domainForm}>
                  <div className={styles.labels}>
                    <Text variant="bodyMd" as="span">
                      Email domain:
                    </Text>
                  </div>

                  {isLoading ? (
                    <div>
                      <br />
                      <SkeletonBodyText lines={1} />
                    </div>
                  ) : (
                    <FormItem name="domain">
                      <InputDisableSubmit
                        inititalValue={selectedDomain}
                        setValue={setSelectedDomain}
                        disabled={disabled}
                      />
                    </FormItem>
                  )}
                </div> */}
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
                {isLoading ? (
                  <div>
                    <br />
                    <SkeletonBodyText lines={1} />
                  </div>
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
                        Enable 2FA for all users
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
                loading={updating}
                // disabled={!formRef.current?.dirty}
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
