import { useJob } from "@moose-desk/core";
import { AccessManger, UserSettingRepository } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  Banner,
  Button,
  ButtonGroup,
  Card,
  FormLayout,
  Layout,
  Link,
  Page,
  Stack,
  Tag,
  Text,
} from "@shopify/polaris";
import { FormikProps } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { catchError, map, of } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import Switch from "src/components/Switch/Switch";
import useAuth from "src/hooks/useAuth";
import InputDisableSubmit from "src/modules/setting/component/InputDisableSubmit/InputDisableSubmit";
import { BannerPropsAccessManager } from "src/modules/setting/modal/account&Security/AccountManager";
import { object, string } from "yup";
export default function IndexAccountManager({ props }: any) {
  const auth = useAuth();
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
  const [banner, setBanner] = useState<BannerPropsAccessManager>({
    status: "success",
    message: "",
    isShowBanner: false,
  });
  const initialValues = useMemo(
    () => ({
      autoJoinEnabled: false,
      whitelistDomains: [],
      twoFactorAuthEnabled: false,
      domain: "",
    }),
    [props]
  );
  const formRef = useRef<FormikProps<any>>(null);
  const validateObject = useCallback(() => {
    if (formRef.current?.values.autoJoinEnabled) {
      if (selectedDomain.length === 0) {
        return object().shape({
          domain: string()
            .matches(
              /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
              "Invalid domain name."
            )
            .required("Please, enter domain!"),
        });
      } else {
        return object().shape({
          domain: string().matches(
            /^(?=.{1,253}\.?$)(?:(?!-|[^.]+_)[A-Za-z0-9-_]{1,63}(?<!-)(?:\.|$)){2,}$/,
            "Invalid domain name."
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
  const { run: fetchAccountManagerStatus, result } = useJob(
    () => {
      return UserSettingRepository.getAccessManagerSetting(auth.user?.id).pipe(
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
  const { run: submit } = useJob((dataSubmit: AccessManger) => {
    return UserSettingRepository.updateAccessManagerSetting(dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Access manager updated successfully.");
          setBanner({
            isShowBanner: true,
            message: "Access manager updated successfully.",
            status: "success",
          });
          fetchAccountManagerStatus();
        } else {
          if (data.statusCode === 409) {
            setBanner({
              isShowBanner: true,
              message: "Update failed.",
              status: "critical",
            });
          } else {
            setBanner({
              isShowBanner: true,
              message: "Update failed.",
              status: "critical",
            });
            show("Update failed", {
              isError: true,
            });
          }
        }
      }),
      catchError((error) => {
        if (error.response.status === 409) {
          setBanner({
            isShowBanner: true,
            message: "Update failed.",
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
          show("Update failed.", {
            isError: true,
          });
        }
        return of(error);
      })
    );
  });
  // reset form
  const handleResetForm = () => {
    formRef.current?.resetForm();
    fetchAccountManagerStatus();
  };
  useEffect(() => fetchAccountManagerStatus(), []);
  return (
    <>
      <Page fullWidth>
        <Form
          initialValues={result || initialValues}
          ref={formRef}
          validationSchema={validateObject}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <FormLayout>
            <Layout>
              {banner.isShowBanner ? (
                <Layout.Section>
                  <Banner
                    status={banner.status}
                    onDismiss={() =>
                      setBanner({ ...banner, isShowBanner: false })
                    }
                  >
                    {banner.message}
                  </Banner>
                </Layout.Section>
              ) : null}
              <Layout.Section>
                <Card title="Auto-Join Settings" sectioned>
                  <Stack spacing="baseTight" alignment="leading">
                    <Stack.Item>
                      <FormItem name="autoJoinEnabled">
                        <Switch onClick={() => setDisabled(!disabled)} />
                      </FormItem>
                    </Stack.Item>
                    <Stack.Item>
                      <div>
                        <Text variant="bodyMd" as="span">
                          Allow users with email addresses from an approved
                          email domain to use the sign up link.
                        </Text>
                      </div>
                      <div className="mt-2">
                        <Link onClick={() => console.log(1)}>
                          {`https://${auth.user?.name.toLocaleLowerCase()}.moosedesk.com/signup`}
                        </Link>
                      </div>
                    </Stack.Item>
                  </Stack>
                  <br />
                  <Stack spacing="baseTight" alignment="leading">
                    <Stack.Item>
                      <Text variant="bodyMd" as="span">
                        Email domain:
                      </Text>
                    </Stack.Item>
                    <Stack.Item fill>
                      <FormItem name="domain">
                        <InputDisableSubmit
                          inititalValue={selectedDomain}
                          setValue={setSelectedDomain}
                          disabled={disabled}
                        />
                      </FormItem>
                      <div className="mt-2">
                        <FormItem name="whitelistDomains">
                          <Stack spacing="tight">{selectedMarkup}</Stack>
                        </FormItem>
                      </div>
                    </Stack.Item>
                  </Stack>
                </Card>
              </Layout.Section>
              <Layout.Section>
                <Card title="Two-Factor Authentication (2FA)" sectioned>
                  <Stack spacing="baseTight" alignment="leading">
                    <Stack.Item>
                      <FormItem name="twoFactorAuthEnabled">
                        <Switch />
                      </FormItem>
                    </Stack.Item>
                    <Stack.Item>
                      <Text variant="bodyMd" as="span">
                        Toggle 2FA for all users
                      </Text>
                    </Stack.Item>
                  </Stack>
                </Card>
              </Layout.Section>
              <Layout.Section fullWidth>
                <Stack distribution="trailing">
                  <ButtonGroup>
                    <Button onClick={handleResetForm}>Cancel</Button>
                    <Button submit primary>
                      Save
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Layout.Section>
            </Layout>
            <FormItem name="whitelistDomains"></FormItem>
          </FormLayout>
        </Form>
      </Page>
    </>
  );
}