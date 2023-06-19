import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import { Button, Card, Input, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { getStatus2FA, updatePassword } from "src/modules/setting/api/api";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { RequestPasswordPayload } from "src/modules/setting/helper/interface";
import { rulesValidatePassword } from "src/regex";
export default function IndexAccountManager() {
  const { t } = useTranslation();
  const notification = useNotification();
  const message = useMessage();
  const [form] = Form.useForm();
  const {
    data: statusSecurity,
    isLoading,
    refetch: fetchingStatus,
  }: any = useQuery({
    queryKey: [QUERY_KEY.TWO_FA_STATUS],
    queryFn: () => getStatus2FA(),
  });
  const method = useMemo(() => {
    return {
      show: statusSecurity?.data?.data?.twoFactorEnabled,
      method: statusSecurity?.data?.data?.twoFactorMethod || "Disabled",
    };
  }, [statusSecurity]);
  const status = useMemo(() => {
    return statusSecurity?.data?.data?.twoFactorStoreEnabled || false;
  }, [statusSecurity]);
  // update password
  const { mutate: updatePasswordMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: RequestPasswordPayload) => updatePassword(payload),
    onMutate: () => {
      message.loading.show(t("messages:loading.updating_password"));
    },
    onSuccess: () => {
      message.loading.hide();
      notification.success(t("messages:success.change_password"));
      handleResetForm();
    },
    onError: (error: any) => {
      message.loading.hide();

      if (error.response.status === 400) {
        if (error.response.data.error[0] === "PASSWORD_NOT_MATCH") {
          notification.error("Current Password not match! Please try again.");
        }
      } else {
        notification.error("System error. Please try again in a few minutes!");
      }
    },
  });

  // name method

  // reset form
  const handleResetForm = useCallback(() => {
    form.resetFields();
  }, []);
  // modal
  const [open2FA, setOpen2FA] = useState(false);
  return (
    <>
      {open2FA ? (
        <Enable2FAModal
          open={open2FA}
          setOpen={setOpen2FA}
          initialValue={{ ...method, status }}
          fetch2FAStatus={fetchingStatus}
        />
      ) : null}
      <Card title="Change Password">
        <Form
          form={form}
          onFinish={updatePasswordMutate}
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
            dependencies={["newPassword"]}
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
            <Button htmlType="submit" type="primary" loading={updating}>
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
