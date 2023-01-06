import { AxiosObservable, useJob, useMount } from "@moose-desk/core";
import {
  Button,
  FormLayout,
  Layout,
  Link,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import axios from "axios";
import { memo, useCallback, useState } from "react";
import { map } from "rxjs";
import Form from "src/components/Form";
import FormItem from "src/components/Form/Item";
import env from "src/core/env";
interface EmailOPT {
  initialValues?: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  back: (value: any) => void;
}
const EmailOPT = ({ initialValues, back }: EmailOPT) => {
  const [onResendEmail, setOnResendEmail] = useState(false);
  const handleSubmit = useCallback(
    (data: any) => {
      submit({ method: initialValues?.twoFactorMethod, ...data });
    },
    [initialValues]
  );

  const { run: submit } = useJob((dataSubmit: any) => {
    axios
      .post(
        `${env.API_URL}/api/v1/account/setting/verify-setup-otp`,
        dataSubmit,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRGMEI1NTA0NDZFM0Y4NDU5Q0Q3Rjg0QjEwRjE0MkE3MjU3RkNEMTkiLCJ4NXQiOiIzd3RWQkViai1FV2MxX2hMRVBGQ3B5Vl96UmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA4OTIyOC01ZTFkLTcxOTItM2I2NS01OWZmNTc5NDQ0YzYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJob2FuZy5hZ2VudC4wMUBnbWFpbC5jb20iLCJlbWFpbCI6ImhvYW5nLmFnZW50LjAxQGdtYWlsLmNvbSIsInJvbGUiOiJCYXNpY0FnZW50IiwiZ2l2ZW5fbmFtZSI6Ik5ndXllbiIsImZhbWlseV9uYW1lIjoiSG9hbmciLCJwaG9uZV9udW1iZXIiOiIoKzg0KSA5MTc3NzY4OTYiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInVuaXF1ZV9uYW1lIjoiaG9hbmcuYWdlbnQuMDFAZ21haWwuY29tIiwic3RvcmVJZCI6IjY4MzY1MDU4MzYyIiwic3ViZG9tYWluIjoiZGV2Iiwib2lfcHJzdCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwib2lfYXVfaWQiOiIzYTA4OTIyYS05YmM3LWRjNjQtYWJkYi00YjRmMzQ3NGRlNTIiLCJjbGllbnRfaWQiOiJNb29zZWRlc2tfUG9zdG1hbiIsIm9pX3Rrbl9pZCI6IjNhMDg5MjJhLTliZDctYWQzZC05OGU2LTMwMTJmZmQ1N2YwZCIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJleHAiOjE2NzMxNDg4MTUsImlzcyI6Imh0dHBzOi8vYXV0aC5tb29zZWRlc2submV0LyIsImlhdCI6MTY3Mjg4OTYxNX0.oXq0FsV5ZsuPXCnAPnP6yei4SSlup_Gtcx8pCsUaF_uXamzpyZ-cHfbYN8pvacswcVkM537lmMDQQAdcClJ4JjcZUMLDeVoyw02vpXrwBvwXju2PPJoOlYV8mMm1yAzeDfocIP5C-SoAishESbudi_fYCHbvPiLTzb5DjnjJgf8amdJPMw0M7wzP47Ohq8ReJZk0Isavy3eR0IdrsTjLufBT38aHk8DfxAbUxZEipReeuQKgeddEWKAprxgOmrzC88AyHkB9_FHU4ib4r--ovAtpa2g6eXVJ2TjEL6FcLgNCPhW00-5LaF_OzIv9EC5SUt791wTMZMB8W2RD2Lh3nQ`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      });
    return AxiosObservable.prototype
      .post(`${env.API_URL}/api/v1/account/update-password`, dataSubmit)
      .pipe(map((data) => console.log(data)));
    // return UserSettingRepository.setupOtp(dataSubmit).pipe(
    //   map(({ data }) => {
    //     console.log(data);
    //     setProps(data.data);
    //   }),
    //   catchError((error) => {
    //     return of(error);
    //   })
    // );
  });

  // resend Email

  const handleResendEmail = useCallback(() => resetEmail(), []);
  const { run: resetEmail } = useJob(() => {
    axios
      .post(
        `${env.API_URL}/api/v1/account/setting/setup-otp`,
        { method: "Email" },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRGMEI1NTA0NDZFM0Y4NDU5Q0Q3Rjg0QjEwRjE0MkE3MjU3RkNEMTkiLCJ4NXQiOiIzd3RWQkViai1FV2MxX2hMRVBGQ3B5Vl96UmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA4OTIyOC01ZTFkLTcxOTItM2I2NS01OWZmNTc5NDQ0YzYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJob2FuZy5hZ2VudC4wMUBnbWFpbC5jb20iLCJlbWFpbCI6ImhvYW5nLmFnZW50LjAxQGdtYWlsLmNvbSIsInJvbGUiOiJCYXNpY0FnZW50IiwiZ2l2ZW5fbmFtZSI6Ik5ndXllbiIsImZhbWlseV9uYW1lIjoiSG9hbmciLCJwaG9uZV9udW1iZXIiOiIoKzg0KSA5MTc3NzY4OTYiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInVuaXF1ZV9uYW1lIjoiaG9hbmcuYWdlbnQuMDFAZ21haWwuY29tIiwic3RvcmVJZCI6IjY4MzY1MDU4MzYyIiwic3ViZG9tYWluIjoiZGV2Iiwib2lfcHJzdCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwib2lfYXVfaWQiOiIzYTA4OTIyYS05YmM3LWRjNjQtYWJkYi00YjRmMzQ3NGRlNTIiLCJjbGllbnRfaWQiOiJNb29zZWRlc2tfUG9zdG1hbiIsIm9pX3Rrbl9pZCI6IjNhMDg5MjJhLTliZDctYWQzZC05OGU2LTMwMTJmZmQ1N2YwZCIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJleHAiOjE2NzMxNDg4MTUsImlzcyI6Imh0dHBzOi8vYXV0aC5tb29zZWRlc2submV0LyIsImlhdCI6MTY3Mjg4OTYxNX0.oXq0FsV5ZsuPXCnAPnP6yei4SSlup_Gtcx8pCsUaF_uXamzpyZ-cHfbYN8pvacswcVkM537lmMDQQAdcClJ4JjcZUMLDeVoyw02vpXrwBvwXju2PPJoOlYV8mMm1yAzeDfocIP5C-SoAishESbudi_fYCHbvPiLTzb5DjnjJgf8amdJPMw0M7wzP47Ohq8ReJZk0Isavy3eR0IdrsTjLufBT38aHk8DfxAbUxZEipReeuQKgeddEWKAprxgOmrzC88AyHkB9_FHU4ib4r--ovAtpa2g6eXVJ2TjEL6FcLgNCPhW00-5LaF_OzIv9EC5SUt791wTMZMB8W2RD2Lh3nQ`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      });
    return AxiosObservable.prototype
      .post(`${env.API_URL}/api/v1/account/update-password`, {})
      .pipe(map((data) => console.log(data)));
    // return UserSettingRepository.setupOtp({ method: "Email" }).pipe(
    //   map(({ data }) => {
    //     console.log(data);
    //     setProps(data.data);
    //   }),
    //   catchError((error) => {
    //     return of(error);
    //   })
    // );
  });
  const handleOnResendEmail = useCallback(() => {
    setOnResendEmail(false);
    setTimeout(() => {
      setOnResendEmail(true);
    }, 10000);
  }, [onResendEmail]);
  useMount(() => handleOnResendEmail());
  return (
    <Form initialValues={{ code: "" }} onSubmit={handleSubmit}>
      <Layout sectioned>
        <Layout.Section>
          <div className="main-content">
            <FormLayout>
              <Stack vertical>
                <Text variant="bodyMd" as="p">
                  Please enter the 6 digits OTP code that we send to your email
                  address in order to enable 2FA with your email.
                </Text>
                <div className="flex items-center">
                  <Text variant="bodyMd" as="span">
                    OTP code
                  </Text>
                  <div className="w-20 ml-4">
                    <FormItem name="code">
                      <TextField
                        type="text"
                        label="OTP code"
                        labelHidden
                        autoComplete="off"
                        maxLength={6}
                      />
                    </FormItem>
                  </div>
                </div>
                <div className="flex items-center">
                  <Text variant="bodyMd" as="span">
                    Did not receive the code yet?
                  </Text>
                  <div className="ml-2">
                    <Link
                      monochrome={onResendEmail}
                      onClick={handleResendEmail}
                    >
                      Re-send OTP Code
                    </Link>
                  </div>
                </div>
              </Stack>
            </FormLayout>
          </div>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Stack distribution="trailing">
            <Button onClick={() => back(1)}>Cancle</Button>
            <Button submit primary>
              Confirm
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};
export default memo(EmailOPT);
