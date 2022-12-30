import { useJob } from "@moose-desk/core";
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
import InputDisableSubmit from "src/components/InputDisableSubmit/InputDisableSubmit";
import Switch from "src/components/Switch/Switch";
import useAuth from "src/hooks/useAuth";
import { AccountManager } from "src/modules/setting/modal/account&Security/AccountManager";
import AccountManagerRepository from "src/modules/setting/repository/account&Security/AccountManagerRepository";
import { object, string } from "yup";
export default function IndexAccountManager({ props }: any) {
  const auth = useAuth();
  const [selectedDomain, setSelectedDomain] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const removeSelectedDomain = useCallback(
    (domain) => () => {
      setSelectedDomain((previousDomain) =>
        previousDomain.filter((previousDomain) => previousDomain !== domain)
      );
    },
    []
  );
  const selectedMarkup = selectedDomain.map((domain) => (
    <Tag key={domain} onRemove={removeSelectedDomain(domain)}>
      {domain}
    </Tag>
  ));
  const { show } = useToast();
  const [messageError, setMessageError] = useState("");
  const [banner, setBanner] = useState(false);
  const initialValues = useMemo(
    () => ({
      autoJoinEnabled: false,
      whitelistDomains: [],
      twoFactorAuthEnabled: false,
      listDomain: "",
    }),
    [props]
  );
  const formRef = useRef<FormikProps<any>>(null);
  const validateObject = useCallback(() => {
    if (!formRef.current?.values.autoJoinEnabled) {
      if (selectedDomain.length < 0) {
        return object().shape({
          listDomain: string()
            .email("Invalid email format ")
            .required("Please, enter email domain!"),
        });
      } else {
        return object().shape({
          listDomain: string().email("Invalid email format "),
        });
      }
    } else {
      return object().shape({});
    }
  }, []);
  // fetch init data
  const { run: fetchAccountManagerStatus, result } = useJob(
    () => {
      return AccountManagerRepository.getData(auth.user?.id).pipe(
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
  const { run: submit } = useJob((dataSubmit: AccountManager) => {
    return AccountManagerRepository.postData(dataSubmit).pipe(
      map(({ data }) => {
        if (data.statusCode === 200) {
          show("Access manager updated successfully.");
          fetchAccountManagerStatus();
        } else {
          setBanner(true);
          if (data.statusCode === 409) {
            setMessageError(`Domains cannot be the same.`);
            show(`Domains cannot be the same.`, {
              isError: true,
            });
          } else {
            show("Update failed", {
              isError: true,
            });
          }
        }
      }),
      catchError((error) => {
        setBanner(true);
        if (error.response.status === 409) {
          setMessageError(`Domains cannot be the same.`);
          show(`Domains cannot be the same.`, {
            isError: true,
          });
        } else {
          show("Update failed", {
            isError: true,
          });
        }
        return of(error);
      })
    );
  });
  useEffect(() => fetchAccountManagerStatus(), []);
  return (
    <>
      <Page title="Access manager" fullWidth compactTitle>
        <Form
          initialValues={result ?? initialValues}
          ref={formRef}
          validationSchema={validateObject}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <FormLayout>
            <Layout sectioned>
              <Layout.Section>
                {banner ? (
                  <Banner status="critical" onDismiss={() => setBanner(false)}>
                    {messageError}
                  </Banner>
                ) : null}
              </Layout.Section>
              <Layout.Section>
                <Card title="Auto join setting" sectioned>
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
                          http://%domainName%.moosedesk.com/signup
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
                      <InputDisableSubmit
                        inititalValue={selectedDomain}
                        setValue={setSelectedDomain}
                        disabled={disabled}
                      />
                      <div className="mt-2">
                        {disabled ? null : (
                          <FormItem name="whitelistDomains">
                            <Stack spacing="tight">{selectedMarkup}</Stack>
                          </FormItem>
                        )}
                      </div>
                    </Stack.Item>
                  </Stack>
                </Card>
              </Layout.Section>
              <Layout.Section>
                <Card title="Two-Factor authentication (2FA)" sectioned>
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
                    <Button>Cancel</Button>
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
