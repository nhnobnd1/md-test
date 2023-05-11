import { InfoCircleOutlined } from "@ant-design/icons";
import { useJob, useParams } from "@moose-desk/core";
import { EmailIntegrationRepository } from "@moose-desk/repo";
import {
  Alert,
  Button,
  Card,
  Form,
  FormInstance,
  Input,
  Spin,
  Steps,
  Tooltip,
  Typography,
} from "antd";
import { FC, useEffect, useState } from "react";
import { catchError, map, of } from "rxjs";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { CompleteStep } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/CompleteStep";
import { ContentWait } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/ContentWait";
import { StepGoogleCode } from "src/modules/settingChannel/components/ChannelEmail/CardForwardEmail/StepGoogleCode";

interface CardForwardEmailProps {
  formEmail: FormInstance<any>;
}
type Status = "Pending" | "Success" | "Fail";

export const CardForwardEmail: FC<CardForwardEmailProps> = ({ formEmail }) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState(0);
  const [googleCode, setGoogleCode] = useState("");
  const [errorTextGoogle, setErrorTextGoogle] = useState("");
  const [isVerified, setIsVerified] = useState<Status>("Pending");
  const [retryCount, setRetryCount] = useState(0);
  const [retryGoogleCode, setRetryGoogleCode] = useState(0);
  const [emails, setEmails] = useState<string[]>([]);
  const [isGmail, setIsGmail] = useState(true);
  const [isVerifySender, setIsVerifySender] = useState<Status>("Pending");
  const [retrySenderCount, setRetrySenderCount] = useState(0);

  const { id } = useParams();
  const message = useMessage();
  const notification = useNotification();

  const { run: getListEmailApi } = useJob((payload: any) => {
    return EmailIntegrationRepository()
      .getListEmail(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            const listEmails = data.data.map((item) => item.supportEmail);
            setEmails(listEmails);
          } else {
            message.error("Get data agent failed");
          }
        })
      );
  });

  const { run: checkVerifyEmail, processing: loadingCheck } = useJob(
    (payload: string) => {
      return EmailIntegrationRepository()
        .checkVerifyEmailSes(payload)
        .pipe(
          map(({ data }) => {
            if (data.statusCode === 200) {
              if (data.data.isVerified) {
                setIsVerifySender("Success");
              } else {
                retrySenderCount === 0
                  ? setIsVerifySender("Fail")
                  : setIsVerifySender("Pending");
                setTimeout(
                  () => {
                    setRetrySenderCount(retrySenderCount + 1);
                  },
                  retrySenderCount === 0 ? 0 : 3000
                );
              }
            }
          }),
          catchError((err) => {
            message.error("Something went wrong !");
            return of(err);
          })
        );
    }
  );

  const { run: sendVerifyEmail } = useJob((payload: string) => {
    return EmailIntegrationRepository()
      .sendVerifyEmailSes(payload)
      .pipe(
        map(({ data }) => {
          if (data.statusCode === 200) {
            setRetrySenderCount(1);
          }
        }),
        catchError((err) => {
          message.error("Something went wrong !");
          return of(err);
        })
      );
  });

  const onFinish = (values: any) => {
    if (emails.length > 0 && emails.includes(values.email)) {
      form.setFields([
        {
          name: "email",
          value: values.email,
          errors: ["Email has already been set up"],
        },
      ]);
      return;
    }
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

  useEffect(() => {
    getListEmailApi({
      limit: 1000,
      page: 1,
    });
    if (id) {
      checkVerifyEmail(formEmail.getFieldValue("supportEmail"));
    }
  }, [id]);

  useEffect(() => {
    if (retrySenderCount === 20) {
      setIsVerifySender("Fail");
      setRetrySenderCount(0);
      return;
    }
    if (retrySenderCount > 1 && isVerifySender !== "Success") {
      checkVerifyEmail(formEmail.getFieldValue("supportEmail"));
    }
  }, [retrySenderCount, isVerifySender]);
  return (
    <>
      {id ? (
        !(loadingCheck && retrySenderCount === 0) && (
          <Card
            className="mb-5 "
            title={
              <>
                <span>Sender verification status</span>
                <Tooltip
                  className="ml-3"
                  title="To use your email for sending tickets, sender verification is required"
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </>
            }
            type="inner"
          >
            {isVerifySender === "Success" ? (
              <Alert
                message="Verified. You can use this email to send tickets."
                type="success"
                showIcon
              />
            ) : (
              <>
                <Alert
                  message="This email has not been verified, please verify it in order to use this email for sending tickets."
                  type="error"
                  showIcon
                />
                <div className="flex gap-5 justify-center mt-2">
                  <Button
                    loading={isVerifySender === "Pending"}
                    onClick={() => {
                      sendVerifyEmail(formEmail.getFieldValue("supportEmail"));
                      setIsVerifySender("Pending");
                      setRetrySenderCount(2);
                      notification.success(`We have sent a verification email to the address ${formEmail.getFieldValue(
                        "supportEmail"
                      )}. 
Please check your inbox and click on the link within to use this email for sending tickets`);
                    }}
                    type="primary"
                  >
                    {isVerifySender === "Pending"
                      ? "Sender verification inprogress ..."
                      : "Send verification email"}
                  </Button>
                </div>
              </>
            )}
          </Card>
        )
      ) : (
        <Card className="mb-5 " title="Forwarding details" type="inner">
          <Steps
            className="mb-5"
            current={step}
            items={[
              {
                title: <span style={{ fontSize: 14 }}>Step 1</span>,
              },
              {
                title: <span style={{ fontSize: 14 }}>Step 2</span>,
              },
              {
                title: <span style={{ fontSize: 14 }}>Step 3</span>,
              },
              {
                title: <span style={{ fontSize: 14 }}>Step 4</span>,
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
                <Typography.Title className="font-medium text-md" level={3}>
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
              email={form.getFieldValue("email")}
              formEmail={formEmail}
              setRetryCount={setRetryCount}
              setIsVerified={setIsVerified}
              sendVerify={sendVerify}
            />
          )}
        </Card>
      )}
    </>
  );
};
