import { AxiosObservable, useJob } from "@moose-desk/core";
import {
  Button,
  Form,
  FormLayout,
  Layout,
  RadioButton,
  Stack,
} from "@shopify/polaris";
import axios from "axios";
import { memo, useCallback, useEffect, useState } from "react";
import { map } from "rxjs";
import env from "src/core/env";
interface Enable2FA {
  initialValues?: {
    twoFactorEnabled: boolean;
    twoFactorMethod: string;
  };
  handleData2FA: (data: any) => void;
  setProps: (data: any) => void;
}
const Enable2FA = ({ initialValues, handleData2FA, setProps }: Enable2FA) => {
  const [value, setValue] = useState("");

  const handleChange = useCallback((_checked, newValue) => {
    setValue(newValue);
  }, []);
  const handleSubmit = useCallback(() => {
    submit({ method: value });
  }, [value, initialValues]);
  const { run: submit } = useJob((dataSubmit: any) => {
    axios
      .post(`${env.API_URL}/api/v1/account/setting/setup-otp`, dataSubmit, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkRGMEI1NTA0NDZFM0Y4NDU5Q0Q3Rjg0QjEwRjE0MkE3MjU3RkNEMTkiLCJ4NXQiOiIzd3RWQkViai1FV2MxX2hMRVBGQ3B5Vl96UmsiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTA4OTIyOC01ZTFkLTcxOTItM2I2NS01OWZmNTc5NDQ0YzYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJob2FuZy5hZ2VudC4wMUBnbWFpbC5jb20iLCJlbWFpbCI6ImhvYW5nLmFnZW50LjAxQGdtYWlsLmNvbSIsInJvbGUiOiJCYXNpY0FnZW50IiwiZ2l2ZW5fbmFtZSI6Ik5ndXllbiIsImZhbWlseV9uYW1lIjoiSG9hbmciLCJwaG9uZV9udW1iZXIiOiIoKzg0KSA5MTc3NzY4OTYiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOiJGYWxzZSIsImVtYWlsX3ZlcmlmaWVkIjoiVHJ1ZSIsInVuaXF1ZV9uYW1lIjoiaG9hbmcuYWdlbnQuMDFAZ21haWwuY29tIiwic3RvcmVJZCI6IjY4MzY1MDU4MzYyIiwic3ViZG9tYWluIjoiZGV2Iiwib2lfcHJzdCI6Ik1vb3NlZGVza19Qb3N0bWFuIiwib2lfYXVfaWQiOiIzYTA4OTIyYS05YmM3LWRjNjQtYWJkYi00YjRmMzQ3NGRlNTIiLCJjbGllbnRfaWQiOiJNb29zZWRlc2tfUG9zdG1hbiIsIm9pX3Rrbl9pZCI6IjNhMDg5MjJhLTliZDctYWQzZC05OGU2LTMwMTJmZmQ1N2YwZCIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MiLCJleHAiOjE2NzMxNDg4MTUsImlzcyI6Imh0dHBzOi8vYXV0aC5tb29zZWRlc2submV0LyIsImlhdCI6MTY3Mjg4OTYxNX0.oXq0FsV5ZsuPXCnAPnP6yei4SSlup_Gtcx8pCsUaF_uXamzpyZ-cHfbYN8pvacswcVkM537lmMDQQAdcClJ4JjcZUMLDeVoyw02vpXrwBvwXju2PPJoOlYV8mMm1yAzeDfocIP5C-SoAishESbudi_fYCHbvPiLTzb5DjnjJgf8amdJPMw0M7wzP47Ohq8ReJZk0Isavy3eR0IdrsTjLufBT38aHk8DfxAbUxZEipReeuQKgeddEWKAprxgOmrzC88AyHkB9_FHU4ib4r--ovAtpa2g6eXVJ2TjEL6FcLgNCPhW00-5LaF_OzIv9EC5SUt791wTMZMB8W2RD2Lh3nQ`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setProps(res.data.data);
        handleData2FA({
          ...initialValues,
          twoFactorMethod: res.data.data.method,
        });
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
  useEffect(
    () =>
      initialValues ? setValue(initialValues.twoFactorMethod) : setValue(""),
    [initialValues]
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Layout sectioned>
        <Layout.Section>
          <div className="main-content">
            <FormLayout>
              <Stack vertical>
                <RadioButton
                  label="Off"
                  checked={value === "Disabled"}
                  name="status2FA"
                  id="Disabled"
                  onChange={handleChange}
                />
                <RadioButton
                  label="Use Email Address"
                  helpText="When you login from a new computer or browser, system will send an OTP code to your email to verify your identity."
                  checked={value === "Email"}
                  name="status2FA"
                  onChange={handleChange}
                  id="Email"
                />
                <RadioButton
                  label="Use external authenticator application."
                  checked={value === "Authenticator"}
                  name="status2FA"
                  onChange={handleChange}
                  id="Authenticator"
                />
              </Stack>
            </FormLayout>
          </div>
        </Layout.Section>
        <Layout.Section fullWidth>
          <Stack distribution="trailing">
            <Button submit primary>
              Save
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};
export default memo(Enable2FA);
