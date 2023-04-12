import { useJob } from "@moose-desk/core";
import { EmailIntegrationRepository } from "@moose-desk/repo";
import { Button, Card, Form, Input, Spin, Steps, Typography } from "antd";
import { FC, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import { CompleteStep } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/CompleteStep";
import { ContentWait } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/ContentWait";
import { StepGoogleCode } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/StepGoogleCode";

interface CardForwardEmailProps {}
type Status = "Pending" | "Success" | "Fail";

export const CardForwardEmail: FC<CardForwardEmailProps> = () => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [googleCode, setGoogleCode] = useState("");
  const [errorTextGoogle, setErrorTextGoogle] = useState("");
  const [isVerified, setIsVerified] = useState<Status>("Pending");
  const [retryCount, setRetryCount] = useState(0);
  const [retryGoogleCode, setRetryGoogleCode] = useState(0);
  const [isGmail, setIsGmail] = useState(true);
  const message = useMessage();
  const onFinish = (values: any) => {
    lookUpTypeEmail(values.email);
  };
  const handleVerifyCodeGoogle = () => {
    setRetryGoogleCode(1);
  };
  const handleVerifyFinish = () => {
    setRetryCount(1);
  };

  const sendVerify = () => {
    sendVerifyApi(form.getFieldValue("email"));
  };
  useEffect(() => {
    if (retryCount === 20) {
      setIsVerified("Fail");
      setRetryCount(0);
      return;
    }
    if (retryCount > 0 && isVerified !== "Success") {
      verifyFinish(form.getFieldValue("email"));
    }
  }, [retryCount, isVerified]);

  useEffect(() => {
    if (retryGoogleCode === 10) {
      setErrorTextGoogle(
        "Please make sure you’ve updated your Gmail settings by following the steps above."
      );
      setRetryGoogleCode(0);
      return;
    }
    if (retryGoogleCode > 0 && !googleCode) {
      verifyGoogleCodeApi(form.getFieldValue("email"));
    }
  }, [retryGoogleCode, googleCode]);

  const { run: lookUpTypeEmail } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .verifyTypeMail(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.isGoogle) {
              setStep(1);
            } else {
              setStep(2);
              setIsGmail(false);
            }
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
          return of(err);
        })
      );
  });
  const { run: verifyGoogleCodeApi } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .verifyGoogleCode(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            if (parseInt(data.data.confirmationCode)) {
              setGoogleCode(data.data.confirmationCode);
              setStep(2);
            } else {
              setTimeout(() => {
                setRetryGoogleCode(retryGoogleCode + 1);
              }, 3000);
              // setStep(2);
              // setErrorTextGoogle(
              //   "Please make sure you’ve updated your Gmail settings by following the steps above."
              // );
            }
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
          setErrorTextGoogle(
            "Please make sure you’ve updated your Gmail settings by following the steps above."
          );
          return of(err);
        })
      );
  });
  const { run: sendVerifyApi } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .sendVerifyForwardEmail(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setStep(3);
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
          return of(err);
        })
      );
  });

  const { run: verifyFinish } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .checkVerifyForwardEmail(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            if (data.data.isVerified) {
              setIsVerified("Success");
            } else {
              setTimeout(() => {
                setRetryCount(retryCount + 1);
              }, 3000);
            }
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
          return of(err);
        })
      );
  });
  useEffect(() => {
    if (step === 1) {
      setErrorTextGoogle("");
      setRetryCount(0);
      setIsVerified("Pending");
      setGoogleCode("");
      setRetryGoogleCode(0);
    }
  }, [step]);
  return (
    <Card className="mb-5 " title="Forwarding details" type="inner">
      <Steps
        className="mb-10"
        current={step}
        items={[
          {
            title: "Step 1",
          },
          {
            title: "Step 2",
          },
          {
            title: "Step 3",
          },
          {
            title: "Step 4",
          },
        ]}
      />

      <Form
        name="forward-mail"
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{ email: "" }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            form.submit();
          }
        }}
      >
        {step === 0 && (
          <div className="flex flex-col items-center">
            <Typography.Title level={3}>
              Enter current support address
            </Typography.Title>
            <div className="flex gap-3 flex-col items-center mt-1">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "You must enter your email!" },
                  { type: "email", message: "Email is invalid!" },
                ]}
              >
                <Input
                  onKeyPress={(e) => {
                    e.key === "Enter" && e.preventDefault();
                  }}
                  className="w-[300px]"
                  placeholder="e.g. support@company.com"
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
                className="w-[100px] mt-5"
              >
                Go
              </Button>
            </div>
          </div>
        )}
      </Form>
      {step === 1 && (
        <ContentWait
          setStep={setStep}
          handleVerifyCodeGoogle={handleVerifyCodeGoogle}
        >
          {errorTextGoogle && retryGoogleCode === 0 ? (
            <p
              style={{ color: "red" }}
              className="max-w-[340px] text-center mt-4"
            >
              {errorTextGoogle}
            </p>
          ) : (
            <></>
          )}
          {retryGoogleCode > 0 && retryGoogleCode !== 10 ? (
            <>
              <Spin size="large" className="mt-3" />
            </>
          ) : (
            <></>
          )}
        </ContentWait>
      )}
      {step === 2 && (
        <StepGoogleCode
          isGmail={isGmail}
          code={googleCode}
          sendVerify={sendVerify}
        />
      )}
      {step === 3 && (
        <CompleteStep
          isVerified={isVerified}
          setStep={setStep}
          handleVerifyFinish={handleVerifyFinish}
        />
      )}
    </Card>
  );
};
