import { AgentInfoBlock } from "@moose-beta/agentBeta/components/AgentInfoBlock";
import InputPhoneBeta from "@moose-beta/components/layoutComponents/component/InputPhoneBeta/InputPhoneBeta";
import { FileSize } from "@moose-beta/profile/helper/enum";
import { useNavigate, useUser } from "@moose-desk/core";
import { Agent, Role } from "@moose-desk/repo";
import { Form, message, Select, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { ContextualSaveBar } from "src/components/ContextualSaveBar";
import { postImageApi } from "src/components/UI/Editor/api";
import Icon from "src/components/UI/Icon";
import { MDInput } from "src/components/UI/Input";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import useUpdated from "src/hooks/useUpdated";
import { updateAgent } from "src/modules/agent/api/api";
import {
  ROLE_OPTIONS_FULL,
  ROLE_OPTIONS_LEAD,
} from "src/modules/agent/helper/constant";
import { updateCustomer } from "src/modules/customer/api/api";
import { updateProfile } from "src/modules/setting/api/api";
import { regexPhoneValidate } from "src/regex";
import styles from "./style.module.scss";
const LIST_HONORIFIC = ["Mr", "Mrs", "Ms"];

interface IProps {
  layout: "profile" | "customer" | "agent";
  profile: Agent | any;
  onRefetch: () => void;
  loadingProfile?: boolean;
  onCloseDrawer?: () => void;
}
const Information = ({
  layout,
  profile,
  onRefetch,
  loadingProfile = false,
  onCloseDrawer,
}: IProps) => {
  const { t } = useTranslation();
  const { isLead, role } = usePermission();
  const { isUpdated, setUpdated } = useUpdated();
  const [form] = useForm();
  const notification = useNotification();
  const { sub: userId, isOwner }: string | any = useUser();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (profile?.avatar) {
      setAvatar(profile?.avatar);
    }
    form.setFieldsValue(profile);
  }, [profile]);

  useEffect(() => {
    if (layout === "agent") {
      if (
        (role === profile?.role && isOwner === "False") ||
        (isLead && profile?.role === Role.Admin) ||
        userId === profile?._id
      ) {
        // vào trang bằng url nhập tay hoặc sau khi update agent có role bằng bản thân thì thoát ra ngoài
        navigate(-1);
      }
    }
  }, [profile?.role]);
  const isDisabledForm =
    !(profile?.isActive && profile?.emailConfirmed) && layout === "agent";
  // const buttonEl: HTMLElement | null = document.getElementById("save_button");
  const { mutate: uploadAvatarMutate, isLoading: uploading } = useMutation({
    mutationFn: (payload: any) => postImageApi(payload),
    onSuccess: ({ data }) => {
      setAvatar(data?.urls[0]);
      setUpdated(true);
      // addSaveButton();
    },
  });

  const { mutate: updateProfileMutate, isLoading: profileUpdating } =
    useMutation({
      mutationFn: (payload: any) => updateProfile(profile?._id || "", payload),
      onSuccess: () => {
        onRefetch();
        setUpdated(false);
        notification.success(t("messages:success.update_profile"));
      },
      onError: () => {
        notification.error(t("messages:error.update_profile"));
      },
    });

  const { mutate: updateCustomerMutate, isLoading: customerUpdating } =
    useMutation({
      mutationFn: (payload: any) => updateCustomer(profile?._id || "", payload),
      onSuccess: async () => {
        onRefetch();
        setUpdated(false);
        notification.success(t("messages:success.update_customer"));
      },
      onError: () => {
        notification.error(t("messages:error.update_customer"));
      },
    });

  const { mutate: updateAgentMutate, isLoading: agentUpdating } = useMutation({
    mutationFn: (payload: any) => updateAgent(profile?._id || "", payload),
    onSuccess: async () => {
      onRefetch();
      setUpdated(false);
      notification.success(
        `Update ${profile?.firstName} ${profile?.lastName}`,
        {
          description: t("messages:success.agent_update"),
        }
      );
    },
    onError: () => {
      notification.error(t("messages:error.agent_update"));
    },
  });
  const handleChange = (files: any) => {
    // if (layout === "customer") return;
    const file = files.file;
    if (file.size > FileSize.MAX) {
      message.error("Size of the image must not exceed 3MB.");
      return;
    }
    if (!file.type.includes("image")) {
      message.error("Invalid image format.");
      return;
    }
    uploadAvatarMutate(file);
  };
  const handleRemoveAvatar = () => {
    setAvatar("");
    setUpdated(true);
  };
  const handleSubmitProfile = (data: any) => {
    const payload = { ...data, avatar };
    switch (layout) {
      case "profile":
        return updateProfileMutate(payload);
      case "customer":
        return updateCustomerMutate(payload);
      case "agent":
        return updateAgentMutate(payload);
      default:
        return () => {};
    }
  };
  const loading =
    uploading || customerUpdating || agentUpdating || profileUpdating;
  const convertListGroup = profile?.groupIds?.map(
    (group: { id: string; name: string }) => group?.name
  );
  const handleChangeForm = () => {
    setUpdated(true);
  };

  return (
    <>
      <div className={styles.contentWrap}>
        <div className={styles.blockContent}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              <MDAvatar
                size="large"
                firstName={profile?.firstName}
                lastName={profile?.lastName}
                email={profile?.email}
                source={avatar}
                loading={uploading}
                preview
                skeleton={loadingProfile}
              />

              <div className={styles.wrapActionAvatar}>
                {avatar && !isDisabledForm && (
                  <div
                    className={styles.removeAvatar}
                    onClick={handleRemoveAvatar}
                  >
                    <Icon name="delete" />
                  </div>
                )}
                {!isDisabledForm && (
                  <div className={styles.edit}>
                    <Upload
                      name="avatar"
                      listType="picture-circle"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={() => {
                        return false;
                      }}
                      onChange={handleChange}
                    >
                      <Icon name="edit" color="#8C8C8C" />
                    </Upload>
                  </div>
                )}
              </div>
            </div>
          </div>
          {loadingProfile ? (
            <MDSkeleton lines={4} />
          ) : (
            <div className={styles.formInfo}>
              <Form
                form={form}
                onFinish={handleSubmitProfile}
                onChange={handleChangeForm}
              >
                {layout === "customer" && (
                  <div className={styles.formItem}>
                    <Form.Item label="Honorific" name="honorific">
                      <Select
                        className={styles.honorific}
                        placeholder="Honorific"
                        allowClear
                        onChange={() => setUpdated(true)}
                      >
                        {LIST_HONORIFIC.map((ho: string, i: number) => (
                          <Select.Option key={i} value={ho}>
                            {ho}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                )}
                <div className={styles.formItem}>
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
                    <MDInput
                      size="small"
                      placeholder="First Name"
                      disabled={isDisabledForm}
                    />
                  </Form.Item>
                </div>
                <div className={styles.formItem}>
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
                    <MDInput
                      size="small"
                      placeholder="Last Name"
                      disabled={isDisabledForm}
                    />
                  </Form.Item>
                </div>
                <div className={styles.formItem}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "You must enter your email!" },
                      { type: "email", message: "Email is invalid!" },
                    ]}
                  >
                    <MDInput
                      disabled={layout !== "customer"}
                      placeholder="Email"
                    />
                  </Form.Item>
                </div>

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
                  <InputPhoneBeta
                    placeholder="Phone Number"
                    disabled={isDisabledForm}
                  />
                </Form.Item>
                {layout === "agent" && (
                  <div className={styles.formItem}>
                    <Form.Item
                      label="Role"
                      name="role"
                      rules={[
                        { required: true, message: "User role is required!" },
                      ]}
                    >
                      <Select
                        options={isLead ? ROLE_OPTIONS_LEAD : ROLE_OPTIONS_FULL}
                        disabled={
                          !(profile?.isActive && profile?.emailConfirmed)
                        }
                        onChange={() => setUpdated(true)}
                      />
                    </Form.Item>
                  </div>
                )}
              </Form>
            </div>
          )}
          {loadingProfile ? (
            <MDSkeleton lines={1} />
          ) : (
            layout !== "agent" && (
              <div className={styles.moreInfo}>
                <span className={styles.label}>Role:</span>
                <span className={styles.result}>
                  {profile?.role || "End user"}
                </span>
              </div>
            )
          )}
        </div>
        <div className={styles.blockContent}>
          {loadingProfile ? (
            <MDSkeleton lines={2} />
          ) : (
            <>
              <div className={styles.moreInfo}>
                <span className={styles.label}>Group:</span>
                <span className={styles.result}>
                  {" "}
                  {convertListGroup?.length > 0
                    ? convertListGroup?.map(
                        (groupName: string, index: number) => (
                          <span key={index} style={{ marginRight: 3 }}>
                            {groupName}
                            {index === convertListGroup?.length - 1 ? "" : ","}
                          </span>
                        )
                      )
                    : "-"}
                </span>
              </div>
              <div className={styles.moreInfo}>
                <span className={styles.label}>Timezone:</span>
                <span className={styles.result}>
                  {profile?.timezone || "-"}
                </span>
              </div>
            </>
          )}
        </div>
        {layout === "agent" && (
          <AgentInfoBlock
            profile={profile}
            loading={loadingProfile}
            onRefetch={onRefetch}
          />
        )}
      </div>
      {isUpdated && (
        <ContextualSaveBar
          onCancel={onCloseDrawer}
          onSave={() => form.submit()}
          loading={loading}
        />
      )}
    </>
  );
};

export default React.memo(Information);
