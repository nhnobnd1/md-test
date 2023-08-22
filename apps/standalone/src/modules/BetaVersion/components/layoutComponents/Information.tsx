import InputPhoneBeta from "@moose-beta/components/layoutComponents/component/InputPhoneBeta/InputPhoneBeta";
import { FileSize } from "@moose-beta/profile/helper/enum";
import { useToggle } from "@moose-desk/core";
import { ResendEmailInvitationRequest } from "@moose-desk/repo";
import { message, Select, Switch, Tag, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { postImageApi } from "src/components/UI/Editor/api";
import { Form } from "src/components/UI/Form";
import Icon from "src/components/UI/Icon";
import { MDInput } from "src/components/UI/Input";
import MDAvatar from "src/components/UI/MDAvatar/MDAvatar";
import MDSkeleton from "src/components/UI/Skeleton/MDSkeleton";
import useNotification from "src/hooks/useNotification";
import { usePermission } from "src/hooks/usePerrmisson";
import {
  activeAgent,
  deActiveAgent,
  removeAgent,
  resendInviteEmail,
  updateAgent,
} from "src/modules/agent/api/api";
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
  profile: {
    _id?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    role?: string;
    group?: string[];
    timezone?: string;
    honorific?: string;
    isActive?: boolean;
    emailConfirmed?: boolean;
    storeId?: string;
  };
  onRefetch: () => void;
  loadingProfile?: boolean;
}
const Information = ({
  layout,
  profile,
  onRefetch,
  loadingProfile = false,
}: IProps) => {
  const { t } = useTranslation();
  const { isLead } = usePermission();
  const { state: visible, on, off } = useToggle(false);
  const [form] = Form.useForm();
  const notification = useNotification();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (profile?.avatar) {
      setAvatar(profile?.avatar);
    }
  }, [profile]);

  const isDisabledForm =
    !(profile?.isActive && profile?.emailConfirmed) && layout === "agent";
  // const buttonEl: HTMLElement | null = document.getElementById("save_button");
  const { mutate: uploadAvatarMutate, isLoading: uploading } = useMutation({
    mutationFn: (payload: any) => postImageApi(payload),
    onSuccess: ({ data }) => {
      setAvatar(data?.urls[0]);
      // addSaveButton();
    },
  });

  const { mutate: updateProfileMutate, isLoading: profileUpdating } =
    useMutation({
      mutationFn: (payload: any) => updateProfile(profile?._id || "", payload),
      onSuccess: () => {
        onRefetch();
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

  const { mutate: activeAgentMutate, isLoading: activeIng } = useMutation({
    mutationFn: () => activeAgent(profile?._id || ""),
    onSuccess: async () => {
      onRefetch();
      notification.success(t("messages:success.active_agent"));
    },
    onError: () => {
      notification.error(t("messages:error.active_agent"));
    },
  });
  const { mutate: deActiveAgentMutate, isLoading: deActiveIng } = useMutation({
    mutationFn: () => deActiveAgent(profile?._id || ""),
    onSuccess: async () => {
      onRefetch();
      notification.success(t("messages:success.deactivate_agent"));
    },
    onError: () => {
      notification.error(t("messages:error.deactivate_agent"));
    },
  });
  const { mutate: sendInviteMutate, isLoading: sending } = useMutation({
    mutationFn: (payload: ResendEmailInvitationRequest) =>
      resendInviteEmail(payload),
    onSuccess: async () => {
      notification.success(`Resend invitation ${profile?.email}`, {
        description: t("messages:success.resend_invitation_email"),
      });
    },
    onError: () => {
      notification.error(t("messages:error.resend_invitation_email"));
    },
  });
  const { mutate: removeAgentMutate, isLoading: removing } = useMutation({
    mutationFn: () => removeAgent(profile?._id || ""),
    onSuccess: async () => {
      notification.success(t("messages:success.deleted_agent"));
    },
    onError: () => {
      notification.error(t("messages:error.deleted_agent"), {
        description: "Remove agent failed",
      });
    },
  });
  // const addSaveButton = () => {
  //   if (buttonEl?.classList.contains(styles.showButton)) return;
  //   buttonEl?.classList.add(styles.showButton);
  // };
  // const removeSaveButton = () => {
  //   if (buttonEl?.classList.contains(styles.showButton)) {
  //     buttonEl?.classList.remove(styles.showButton);
  //   }
  // };

  // const handleChangeForm = () => {
  //   addSaveButton();
  // };
  const handleChangeStatus = (value: boolean) => {
    value ? activeAgentMutate() : deActiveAgentMutate();
  };
  const handleChange = (files: any) => {
    if (layout === "customer") return;
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

  return (
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
              {avatar && (
                <div
                  className={styles.removeAvatar}
                  onClick={handleRemoveAvatar}
                >
                  <Icon name="delete" />
                </div>
              )}
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
            </div>
          </div>
        </div>
        {loadingProfile ? (
          <MDSkeleton lines={4} />
        ) : (
          <div className={styles.formInfo}>
            <Form
              form={form}
              // onValuesChange={handleChangeForm}
              onFinish={handleSubmitProfile}
              initialValues={profile}
              enableReinitialize
            >
              {layout === "customer" && (
                <div className={styles.formItem}>
                  <Form.Item label="Honorific" name="honorific">
                    <Select
                      className={styles.honorific}
                      placeholder="Honorific"
                      allowClear
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
                      disabled={!(profile?.isActive && profile?.emailConfirmed)}
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
        {!isDisabledForm && (
          <div className={styles.groupButton} id="save_button">
            <div className={styles.shiningButton}>
              <MDButton
                size="small"
                type="primary"
                loading={loading}
                onClick={() => form.submit()}
              >
                Save
              </MDButton>
            </div>
          </div>
        )}
      </div>
      <div className={styles.blockContent}>
        {loadingProfile ? (
          <MDSkeleton lines={2} />
        ) : (
          <>
            <div className={styles.moreInfo}>
              <span className={styles.label}>Group:</span>
              <span className={styles.result}>-</span>
            </div>
            <div className={styles.moreInfo}>
              <span className={styles.label}>Timezone:</span>
              <span className={styles.result}>{profile?.timezone || "-"}</span>
            </div>
          </>
        )}
      </div>
      {layout === "agent" && (
        <div className={styles.blockContent}>
          {loadingProfile ? (
            <MDSkeleton lines={1} />
          ) : !profile?.emailConfirmed ? (
            <div className="d-grid">
              <MDButton
                type="link"
                onClick={() =>
                  sendInviteMutate({
                    email: profile?.email || "",
                    storeId: profile?.storeId || "",
                  })
                }
                loading={sending}
              >
                Send Invitation Email
              </MDButton>
              <MDButton
                onClick={() => removeAgentMutate()}
                type="primary"
                danger
                className="mt-2"
                loading={removing}
              >
                Remove Agent
              </MDButton>
            </div>
          ) : (
            <>
              <div className={styles.moreInfo}>
                <span className={styles.label}>Status:</span>
                <span className={styles.result}>
                  <Switch
                    onChange={handleChangeStatus}
                    loading={activeIng || deActiveIng}
                    checked={profile?.isActive}
                  />
                  <Tag
                    className="ml-2"
                    color={profile?.isActive ? "green" : "error"}
                  >
                    {profile?.isActive ? "Active" : "Deactivate"}
                  </Tag>
                </span>
              </div>
            </>
          )}
        </div>
      )}
      {/* <Modal */}
    </div>
  );
};

export default React.memo(Information);
