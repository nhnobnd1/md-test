import { useJob, useParams } from "@moose-desk/core";
import {
  CheckConnectionRequest,
  GetEmailGoogleAuthRequest,
  GetEmailMicrosoftAuthRequest,
  MailBoxType,
} from "@moose-desk/repo";
import EmailIntegrationRepository from "@moose-desk/repo/emailIntegration/EmailIntegrationRepository";
import { Alert, Button, Card, FormInstance, Radio } from "antd";
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import Images from "src/assets/images";
import { Form } from "src/components/UI/Form";
import useMessage from "src/hooks/useMessage";
import CardSettingExternalMail, {
  TypePort,
} from "src/modules/settingChannel/components/ChannelEmail/CardSelectEmail/CardSettingExternalMail";
import { IsLoggedServer } from "src/modules/settingChannel/components/ChannelEmail/ChannelEmailForm";
import { setExternalMailConnection } from "src/modules/settingChannel/redux/channelEmail";
import { useAppDispatch, useAppSelector } from "src/redux/hook";
import LogosGoogleIcon from "~icons/logos/google-icon";
import LogosMicrosoftWindows from "~icons/logos/microsoft-windows";

interface CardSelectEmailProps {
  form: FormInstance<any>;
  className?: string;
  type: "new" | "update";
  loggedServer: IsLoggedServer | null;
}

export interface CardSelectMailRefProperties {
  resetConnectionImap: () => void;
  resetConnectionSmtp: () => void;
}

export const CardSelectEmail = forwardRef(
  (
    { form, className, loggedServer, type }: CardSelectEmailProps,
    ref: ForwardedRef<CardSelectMailRefProperties>
  ) => {
    const dispatch = useAppDispatch();
    const message = useMessage();
    const { id } = useParams();

    const signCallback = useAppSelector(
      (state) => state.channelEmail.signInCallback
    );
    const { t } = useTranslation();

    const { run: getEmailGoogleAuth } = useJob(
      (payload: GetEmailGoogleAuthRequest) => {
        return EmailIntegrationRepository()
          .getEmailGoogleAuth(payload)
          .pipe(
            map(({ data }) => {
              if (data.statusCode === 200) {
                window.location.href = data.data;
              }
            })
          );
      },
      {
        showLoading: true,
      }
    );

    const { run: getEmailMicrosoftAuth } = useJob(
      (payload: GetEmailMicrosoftAuthRequest) => {
        return EmailIntegrationRepository()
          .getEmailMicrosoftAuth(payload)
          .pipe(
            map(({ data }) => {
              if (data.statusCode === 200) {
                window.location.href = data.data;
              }
            })
          );
      },
      {
        showLoading: true,
      }
    );

    const handleSignInSocial = useCallback(
      (social: "google" | "microsoft") => {
        const payload: GetEmailGoogleAuthRequest = {
          type: type,
          id: id,
          // ...(import.meta.env.MODE === "development" && {
          //   subdomainForTest: "localhost:3580",
          // }),
        };

        if (social === "google") {
          getEmailGoogleAuth(payload);
        } else if (social === "microsoft") {
          getEmailMicrosoftAuth(payload);
        }
      },
      [import.meta.env]
    );

    const onChangeEmail = useCallback(() => {
      if (form.getFieldValue("mailboxType") === MailBoxType.GMAIL) {
        handleSignInSocial("google");
      }
      if (form.getFieldValue("mailboxType") === MailBoxType.OUTLOOK) {
        handleSignInSocial("microsoft");
      }
    }, [form]);

    const [connectionImap, setConnectionImap] = useState<boolean | undefined>(
      undefined
    );

    const resetConnectionImap = useCallback(() => {
      setConnectionImap(undefined);
    }, [setConnectionImap]);

    const [connectionSmtp, setConnectionSmtp] = useState<boolean | undefined>(
      undefined
    );

    const resetConnectionSmtp = useCallback(() => {
      setConnectionSmtp(undefined);
    }, [setConnectionSmtp]);

    const { run: checkConnectionImap, processing: loadingCheckImap } = useJob(
      (payload: CheckConnectionRequest) => {
        message.loading.show(t("messages:loading.checking_connection_server"));

        return EmailIntegrationRepository()
          .checkConnectionImap(payload)
          .pipe(
            map(({ data }) => {
              message.loading.hide().then(() => {
                if (data.statusCode === 200 && data.data.success) {
                  setConnectionImap(true);
                  message.success(t("messages:success.connection"));
                } else {
                  message.error(t("messages:error.connection"));

                  setConnectionImap(false);
                }
              });
            }),
            catchError((err) => {
              message.loading.hide().then(() => {
                setConnectionImap(false);
                message.error(t("messages:error.connection"));
              });
              return of(err);
            })
          );
      }
    );

    const { run: checkConnectionSmtp, processing: loadingCheckSmtp } = useJob(
      (payload: CheckConnectionRequest) => {
        message.loading.show(t("messages:loading.checking_connection_server"));

        return EmailIntegrationRepository()
          .checkConnectionSmtp(payload)
          .pipe(
            map(({ data }) => {
              message.loading.hide().then(() => {
                if (data.statusCode === 200 && data.data.success) {
                  setConnectionSmtp(true);
                  message.success(t("messages:success.connection"));
                } else {
                  message.error(t("messages:error.connection"));

                  setConnectionSmtp(false);
                }
              });
            }),
            catchError((err) => {
              message.loading.hide().then(() => {
                setConnectionSmtp(false);
                message.error(t("messages:error.connection"));
              });
              return of(err);
            })
          );
      }
    );

    const checkValidateServerMap = useCallback(
      async (type: "imap" | "smtp") => {
        const namePath = type === "imap" ? "incoming" : "outgoing";
        let state = false;
        await form
          .validateFields([
            [namePath, "mailServer"],
            [namePath, "authentication"],
            [namePath, "email"],
          ])
          .then(() => {
            state = true;
          })
          .catch(() => {
            state = false;
          });
        return state;
      },
      [form]
    );

    const testConnection = useCallback(
      async (type: "imap" | "smtp") => {
        const payload =
          type === "imap"
            ? form.getFieldValue("incoming")
            : form.getFieldValue("outgoing");

        const validateState = await checkValidateServerMap(type);

        if (payload && validateState) {
          const request: CheckConnectionRequest = {
            host: payload.mailServer,
            port: payload.port,
            password: payload.password ?? "",
            tls: payload.useSsl ?? false,
            user: payload.email,
          };

          switch (type) {
            case "imap":
              checkConnectionImap(request);
              break;

            case "smtp":
              checkConnectionSmtp(request);
              break;
            default:
              break;
          }
        }
      },
      [form]
    );

    useEffect(() => {
      const statusImap = connectionImap ?? false;
      const statusSmtp = connectionSmtp ?? false;
      const status = statusImap && statusSmtp;
      dispatch(setExternalMailConnection(status));

      return () => {
        dispatch(setExternalMailConnection(false));
      };
    }, [connectionImap, connectionSmtp]);

    useImperativeHandle(ref, () => ({
      resetConnectionImap,
      resetConnectionSmtp,
    }));

    const SettingUpMail = () => {
      return (
        <>
          <div className="pb-6">
            The Email you just signed in is:{" "}
            <span className="font-bold">
              {signCallback.supportEmail || form.getFieldValue("supportEmail")}
            </span>
            <span
              className={`ml-4 link ${
                !signCallback.name && !form.getFieldValue("isLive")
                  ? "hidden"
                  : ""
              }`}
              onClick={onChangeEmail}
            >
              Change email address
            </span>
          </div>
          {!signCallback.name && !form.getFieldValue("isLive") ? (
            <div>
              <Alert
                message="Your Gmail credentials have expired. Please sign in again."
                type="warning"
                showIcon
                // closable
              />
              <div className="flex gap-2 items-center flex-wrap mt-3">
                <Button
                  className="flex items-center "
                  size="middle"
                  icon={
                    <span className="flex items-center mr-2 text-[16px]">
                      <LogosGoogleIcon />
                    </span>
                  }
                  onClick={() => handleSignInSocial("google")}
                >
                  Sign In Gmail
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* <Form.Item name="accessType">
            <Radio.Group>
              <Radio className="mr-4" value={AccessType.Both}>
                Both
              </Radio>
              <Radio className="mr-4" value={AccessType.Outgoing}>
                Outgoing mails
              </Radio>
              <Radio className="mr-4" value={AccessType.Incoming}>
                Incoming mails
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="deleteFromServer" valuePropName="checked">
            <Checkbox>Delete from server after fetching</Checkbox>
          </Form.Item> */}
        </>
      );
    };
    return (
      <Card className={className} type="inner" title="Mail Server">
        <Form.Item className="mb-[40px] hidden" name="mailboxType">
          <Radio.Group>
            <Radio className="mr-4" value={MailBoxType.GMAIL}>
              <LogosGoogleIcon className="text-[16px] mr-1 ml-[4px] translate-y-1" />
              <span>Gmail</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
        <div>
          {/* gmail and logged */}
          {form.getFieldValue("mailboxType") === MailBoxType.GMAIL && (
            <>
              {loggedServer?.success &&
              loggedServer?.callBackName === "gmail" ? (
                <SettingUpMail />
              ) : (
                <div className="flex gap-2 items-center flex-wrap hover:cursor-pointer">
                  {/* <Button
                    className="flex items-center "
                    size="middle"
                    icon={
                      <img src={Images.Logo.ButtonGoogle} width={240} alt="" />
                    }
                    onClick={() => handleSignInSocial("google")}
                  ></Button> */}
                  <img
                    src={Images.Logo.ButtonGoogle}
                    width={180}
                    onClick={() => handleSignInSocial("google")}
                    alt=""
                  />
                </div>
              )}
            </>
          )}

          {/* microsoft and logged */}
          {form.getFieldValue("mailboxType") === MailBoxType.OUTLOOK && (
            <>
              {loggedServer?.success &&
              loggedServer?.callBackName === "microsoft" ? (
                <SettingUpMail />
              ) : (
                <Button
                  className="flex items-center mb-4"
                  size="middle"
                  icon={
                    <span className="flex items-center mr-2 text-[16px]">
                      <LogosMicrosoftWindows />
                    </span>
                  }
                  onClick={() => handleSignInSocial("microsoft")}
                >
                  Sign In Microsoft Live Email
                </Button>
              )}
            </>
          )}

          {/* external mail */}
          {form.getFieldValue("mailboxType") === MailBoxType.OTHER && (
            <>
              <CardSettingExternalMail
                className="mb-6"
                title="Incoming Mail Configuration"
                typePort={TypePort.IMAP}
                nameForm="incoming"
                connection={connectionImap}
                loadingTestConnection={loadingCheckImap}
                testConnection={() => testConnection("imap")}
              />

              <CardSettingExternalMail
                title="Outgoing Mail Configuration"
                nameForm="outgoing"
                typePort={TypePort.SMTP}
                connection={connectionSmtp}
                loadingTestConnection={loadingCheckSmtp}
                testConnection={() => testConnection("smtp")}
              />
            </>
          )}
        </div>
      </Card>
    );
  }
);

export default React.memo(CardSelectEmail);
