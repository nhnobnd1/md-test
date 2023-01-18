import { TokenManager, useJob, useMount } from "@moose-desk/core";
import { AgentRepository } from "@moose-desk/repo";
import { Button, Input } from "antd";
import * as jose from "jose";
import { useCallback } from "react";
import { catchError, map, of } from "rxjs";
import { Form } from "src/components/UI/Form";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";

export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token") || "");
  //   console.log(TokenManager.getToken("base_token"));

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
    message.loading.show("Updating profile ...");
    const { _id } = dataSubmit;
    return AgentRepository()
      .update(_id, dataSubmit)
      .pipe(
        map(({ data }) => {
          message.loading.hide();
          if (data.statusCode === 200) {
            notification.success("Profile updated successfully.");
            fetDetailsProfile(token.sub ?? "");
          } else {
            notification.error("Update profile failed.");
          }
        }),
        catchError((error) => {
          message.loading.hide();
          notification.error("Update profile failed.");
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
            { required: true, message: "You must enter your first name!" },
            {
              max: 255,
              message: "First name up to 255 characters",
            },
          ]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="lastName"
          rules={[
            { required: true, message: "You must enter your last name!" },
            {
              max: 255,
              message: "Last name up to 255 characters",
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
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              pattern: /^(?:[0-9]{1,4})+-(?:[0-9]{5,14})$/,
              message: "Invalid number phone format.",
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
    </div>
  );
}
