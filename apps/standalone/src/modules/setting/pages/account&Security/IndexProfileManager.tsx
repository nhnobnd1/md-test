import { TokenManager, useJob, useMount } from "@moose-desk/core";
import { AgentRepository } from "@moose-desk/repo";
import { Button, Card, Input } from "antd";
import * as jose from "jose";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { regexPhoneValidate } from "src/regex";

export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token") || "");
  const { t, i18n } = useTranslation();

  const message = useMessage();
  const notification = useNotification();
  const [form] = Form.useForm();
  const { run: fetDetailsProfile, result } = useJob(
    (payload: string) => {
      return AgentRepository()
        .getOne(payload)
        .pipe(
          map(({ data }) => {
            return data.data;
          })
        );
    },
    { showLoading: false }
  );
  const { run: submit } = useJob((dataSubmit: any) => {
    message.loading.show(t("messages:loading.updating_profile"));

    const { _id } = dataSubmit;
    return AgentRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success(t("messages:success.update_profile"));
            fetDetailsProfile(token.sub ?? "");
          } else {
            notification.error(t("messages:error.update_profile"));
          }
        }),
        catchError((error) => {
          message.loading.hide();
          notification.error(t("messages:error.update_profile"));

          return of(error);
        })
      );
  });
  const handleSubmitForm = useCallback((value: any) => {
    submit(value);
  }, []);

  const handleResetForm = () => {
    form.resetFields();
    fetDetailsProfile(token.sub ?? "");
  };
  useMount(() => fetDetailsProfile(token.sub ?? ""));
  return (
    <div>
      <Card title="Profile">
        <Form
          onFinish={handleSubmitForm}
          layout="vertical"
          initialValues={result}
          enableReinitialize
        >
          <Form.Item name="_id" hidden />
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "First name is required!" },
              {
                max: 255,
                message: "First name up to 255 characters",
              },
              {
                pattern: /[^\s]/,
                message: "First name is required!",
              },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Last name is required!" },
              {
                max: 255,
                message: "Last name up to 255 characters",
              },
              {
                pattern: /[^\s]/,
                message: "Last name is required!",
              },
            ]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "You must enter your email!" },
              { type: "email", message: "Email is invalid!" },
            ]}
          >
            <Input disabled={true} placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone No."
            name="phoneNumber"
            rules={[
              {
                pattern: regexPhoneValidate,
                message: "The input phone number is not valid",
              },
            ]}
          >
            <InputPhone placeholder="Enter phone number" />
          </Form.Item>
          <div className="flex-1 text-right mt-4">
            <Button onClick={handleResetForm}>Cancel</Button>
            <Button htmlType="submit" type="primary" className="ml-4">
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
