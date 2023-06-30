import { TokenManager } from "@moose-desk/core";
import { Agent } from "@moose-desk/repo";
import { Col, Input, Row } from "antd";
import classNames from "classnames";
import * as jose from "jose";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import { Header } from "src/components/UI/Header";
import { MDInput } from "src/components/UI/Input";
import InputPhone from "src/components/UI/InputPhone/InputPhone";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import { getProfile, updateProfile } from "src/modules/setting/api/api";
import { regexPhoneValidate } from "src/regex";
import styles from "./styles.module.scss";
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
      <Header title="Profile" />

      <div className={styles.wrapForm}>
        {isLoadingProfile || !dataProfile ? (
          <div>
            <div className="mb-3">
              <MDSkeleton lines={1} width={120} />
              <br />
              <MDSkeleton lines={1} />
            </div>
            <div className="mb-3">
              <MDSkeleton lines={1} width={120} />
              <br />
              <MDSkeleton lines={1} />
            </div>
            <div className="mb-3">
              <MDSkeleton lines={1} width={120} />
              <br />
              <MDSkeleton lines={1} />
            </div>
            <div className="mt-4 flex justify-end">
              <MDSkeleton lines={1} width={150} />
            </div>
          </div>
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
            <Row gutter={16} justify="space-between">
              <Col lg={12} xl={12} sm={24} xs={24}>
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
                  <MDInput placeholder="First name" />
                </Form.Item>
              </Col>
              <Col lg={12} xl={12} sm={24} xs={24}>
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
                  <MDInput placeholder="Last name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "You must enter your email!" },
                { type: "email", message: "Email is invalid!" },
              ]}
            >
              <MDInput disabled={true} placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Phone"
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
            <div className={classNames(styles.groupButton, "text-right")}>
              <MDButton onClick={handleResetForm} disabled={updating}>
                Cancel
              </MDButton>
              <MDButton htmlType="submit" type="primary" loading={updating}>
                Save
              </MDButton>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
