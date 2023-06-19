import { TokenManager } from "@moose-desk/core";
import { Agent } from "@moose-desk/repo";
import { Button, Card, Input, Skeleton } from "antd";
import * as jose from "jose";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { Form } from "src/components/UI/Form";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { getProfile, updateProfile } from "src/modules/setting/api/api";
import { regexPhoneValidate } from "src/regex";

export default function IndexProfileManager() {
  const token = jose.decodeJwt(TokenManager.getToken("base_token") || "");
  const { t } = useTranslation();
  const message = useMessage();
  const notification = useNotification();
  const [form] = Form.useForm();
  const [dataProfile, setDataProfile] = useState<Agent>();
  const {
    data: profiles,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
  }: any = useQuery({
    queryKey: ["profile", token.sub],
    queryFn: () => getProfile(token.sub ?? ""),
    enabled: !!token.sub,
    onSuccess: (data: any) => {
      setDataProfile(data?.data?.data);
    },
  });
  const { mutate: submitMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: any) =>
      updateProfile(dataProfile?._id || "", payload),
    onMutate: () => {
      message.loading.show(t("messages:loading.updating_profile"));
    },
    onSuccess: async () => {
      await refetchProfile();
      message.loading.hide();
      notification.success(t("messages:success.update_profile"));
    },
    onError: () => {
      message.loading.hide();

      notification.error(t("messages:error.update_profile"));
    },
  });
  const handleResetForm = () => {
    form.setFieldsValue(profiles?.data?.data);
  };

  return (
    <div>
      <Card title="Profile">
        {isLoadingProfile || !dataProfile ? (
          <>
            <Skeleton />
          </>
        ) : (
          <Form
            form={form}
            onFinish={submitMutate}
            layout="vertical"
            initialValues={dataProfile}
            enableReinitialize
          >
            <Form.Item name="_id" hidden>
              <Input placeholder="" />
            </Form.Item>
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
              <Button onClick={handleResetForm} disabled={updating}>
                Cancel
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                className="ml-4"
                loading={updating}
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Card>
    </div>
  );
}
