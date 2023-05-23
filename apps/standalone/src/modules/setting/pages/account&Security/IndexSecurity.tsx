import { useJob, useMount } from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Button, Card, Input, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { rulesValidatePassword } from "src/regex";
export default function IndexAccountManager() {
  const [status, setStatus] = useState(false);
  const { t } = useTranslation();

  const message = useMessage();
  const notification = useNotification();
  const [form] = Form.useForm();
  const [method, setMethod] = useState<{
    show: boolean;
    method: string;
  }>({
    show: false,
    method: "Disabled",
  });
  const initialValues = useMemo(
    () => ({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }),
    []
  );
  // fetch init data
  // const token = jose.decodeJwt(TokenManager.getToken("base_token"));

  const { run: fetch2FAStatus } = useJob(
    () => {
      return AccountRepository()
        .userGet2FAStatus()
        .pipe(
          map(({ data }) => {
            setMethod({
              ...method,
              show: data.data.twoFactorEnabled,
              method: data.data.twoFactorMethod,
            });
            setStatus(data.data.twoFactorStoreEnabled);
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  // update password
  const handleSubmit = useCallback((data: any) => {
    const dataSubmit = { ...data };
    submit(dataSubmit);
  }, []);

  const { run: submit } = useJob((dataSubmit: any) => {
    message.loading.show(t("messages:loading.updating_password"));

    return AccountRepository()
      .changePassword(dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(t("messages:success.change_password"));
            handleResetForm();
          } else {
            notification.error(t("messages:error.change_password"));
          }
        }),
        catchError((error) => {
          message.loading.hide();
          if (error.response.status === 400) {
            if (error.response.data.error[0] === "PASSWORD_NOT_MATCH") {
              notification.error(
                "Current Password not match! Please try again."
              );
            } else {
              notification.error(
                "Confirm New Password not match with New Password! Please try again."
              );
            }
          } else {
            notification.error(
              "System error. Please try again in a few minutes!"
            );
          }
          return of(error);
        })
      );
  });
  // name method

  // reset form
  const handleResetForm = useCallback(() => {
    form.resetFields();
  }, []);
  // modal
  const [open2FA, setOpen2FA] = useState(false);
  // effect
  useMount(() => {
    fetch2FAStatus();
  });
  return (
    <>
      {open2FA ? (
        <Enable2FAModal
          open={open2FA}
          setOpen={setOpen2FA}
          initialValue={{ ...method, status }}
          fetch2FAStatus={fetch2FAStatus}
        />
      ) : null}
      <Card title="Change Password">
        <Form
          initialValues={initialValues}
          form={form}
          onFinish={handleSubmit}
          onReset={handleResetForm}
          layout="vertical"
          enableReinitialize
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              ...rulesValidatePassword,
              {
                required: true,
                message: "The Current Password is required",
              },
            ]}
          >
            <Input autoComplete="off" type="password" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              ...rulesValidatePassword,
              {
                required: true,
                message: "The New Password is required",
              },
            ]}
          >
            <Input minLength={8} type="password" autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                message: "The Confirm New Password is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The confirmation password is not match!")
                  );
                },
              }),
            ]}
          >
            <Input minLength={8} type="password" autoComplete="off" />
          </Form.Item>
          <div className="flex-1 text-right mt-4">
            <Button htmlType="submit" type="primary">
              Update Password
            </Button>
          </div>
        </Form>
      </Card>
      <Card
        title={
          status ? (
            <Typography.Title level={5}>
              Two-Factor Authentication
            </Typography.Title>
          ) : (
            <Typography.Title type="secondary" level={5}>
              Two-Factor Authentication
            </Typography.Title>
          )
        }
        className="mt-8"
      >
        <div className="flex items-center">
          <div className="mr-4">
            {status ? (
              <Typography.Text>Status :</Typography.Text>
            ) : (
              <Typography.Text type="secondary">Status :</Typography.Text>
            )}
          </div>
          <div>
            <Typography.Text
              type={
                method.show
                  ? status
                    ? "success"
                    : "secondary"
                  : status
                  ? "danger"
                  : "secondary"
              }
              strong
            >
              {method.show ? "Active" : "InActive"}
            </Typography.Text>
          </div>
        </div>
        {method.show ? (
          <div className="flex items-center mt-2">
            <div className="mr-4">
              {status ? (
                <Typography.Text>Method :</Typography.Text>
              ) : (
                <Typography.Text type="secondary">Method :</Typography.Text>
              )}
            </div>
            <div>
              {status ? (
                <Typography.Text strong>
                  {method.method === "Email"
                    ? "Email OTP"
                    : method.method === "Authenticator"
                    ? "External Authentication Application"
                    : method.method}
                </Typography.Text>
              ) : (
                <Typography.Text strong type="secondary">
                  {method.method === "Email"
                    ? "Email OTP"
                    : method.method === "Authenticator"
                    ? "External Authentication Application"
                    : method.method}
                </Typography.Text>
              )}
            </div>
          </div>
        ) : null}
        <div className="mt-4">
          <Button
            onClick={() => setOpen2FA(true)}
            type="primary"
            disabled={!status}
          >
            {method.show ? "Change 2FA Method" : "Enable 2FA"}
          </Button>
        </div>
      </Card>
    </>
  );
}
