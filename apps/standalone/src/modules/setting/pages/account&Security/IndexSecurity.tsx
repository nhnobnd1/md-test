import { useJob, useMount } from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Button, Card, Input, Typography } from "antd";
import { useCallback, useMemo, useState } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import Enable2FAModal from "src/modules/setting/component/Security/Enable2FAModal";
import { object, ref, string } from "yup";
export default function IndexAccountManager() {
  const [status, setStatus] = useState(false);

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
  const validateObject = object().shape({
    currentPassword: string().min(8, "Must be at least 8 characters."),
    newPassword: string()
      .min(8, "Must be at least 8 characters.")
      .when("currentPassword", (currentPassword, field) =>
        currentPassword ? field.required("New Password is required!") : field
      ),
    confirmNewPassword: string()
      .min(8, "Must be at least 8 characters.")
      .when("newPassword", (newPassword, field) =>
        newPassword
          ? field
              .required("Confirm New Password is required!")
              .oneOf(
                [ref("newPassword")],
                "Confirm New Password must match with New Password."
              )
          : field
      ),
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

  const { run: fetch2FAStatus, result } = useJob(
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
    message.loading.show("Updating password ...");
    return AccountRepository()
      .changePassword(dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success("Password updated successfully.");
            handleResetForm();
          } else {
            notification.error("Password updated failed.");
          }
        }),
        catchError((error) => {
          message.loading.hide();
          notification.error("Password updated failed.");
          return of(error);
        })
      );
  });
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
          <Form.Item name="currentPassword" label="Current Password">
            <Input autoComplete="off" type="password" />
          </Form.Item>
          <Form.Item name="newPassword" label="New Password">
            <Input minLength={8} type="password" autoComplete="off" />
          </Form.Item>
          <Form.Item name="confirmNewPassword" label="Confirm New Password">
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
                <Typography.Text strong>{method.method}</Typography.Text>
              ) : (
                <Typography.Text strong type="secondary">
                  {method.method}
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
