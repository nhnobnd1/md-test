import InputPhoneBeta from "@moose-beta/components/layoutComponents/component/InputPhoneBeta/InputPhoneBeta";
import { FileSize } from "@moose-beta/profile/helper/enum";
import { message, Select, Upload } from "antd";
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
import { updateCustomer } from "src/modules/customer/api/api";
import { updateProfile } from "src/modules/setting/api/api";
import { regexPhoneValidate } from "src/regex";
import styles from "./style.module.scss";
const LIST_HONORIFIC = ["Mr", "Mrs", "Ms"];

interface IProps {
  layout: "profile" | "customer";
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
  const [form] = Form.useForm();
  const notification = useNotification();
  const [avatar, setAvatar] = useState("");

  const buttonEl: HTMLElement | null = document.getElementById("save_button");
  const { mutate: uploadAvatarMutate, isLoading: uploading } = useMutation({
    mutationFn: (payload: any) => postImageApi(payload),
    onSuccess: ({ data }) => {
      setAvatar(data?.urls[0]);
      // addSaveButton();
    },
  });
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
  useEffect(() => {
    if (profile?.avatar) {
      setAvatar(profile?.avatar);
    }
  }, [profile]);

  const { mutate: submitMutate, isLoading: updating } = useMutation({
    mutationFn: (payload: any) => updateProfile(profile?._id || "", payload),
    onSuccess: () => {
      onRefetch();
      notification.success(t("messages:success.update_profile"));
      // removeSaveButton();
    },
    onError: () => {
      notification.error(t("messages:error.update_profile"));
    },
  });
  const { mutate: updateCustomerMutate, isLoading: isUpdating } = useMutation({
    mutationFn: (payload: any) => updateCustomer(profile?._id || "", payload),
    onSuccess: async () => {
      onRefetch();
      notification.success(t("messages:success.update_customer"));
    },
    onError: () => {
      notification.error(t("messages:error.update_customer"));
    },
  });
  const addSaveButton = () => {
    if (buttonEl?.classList.contains(styles.showButton)) return;
    buttonEl?.classList.add(styles.showButton);
  };
  const removeSaveButton = () => {
    if (buttonEl?.classList.contains(styles.showButton)) {
      buttonEl?.classList.remove(styles.showButton);
    }
  };

  const handleChangeForm = () => {
    addSaveButton();
  };

  const handleSubmitProfile = (data: any) => {
    const payload = { ...data, avatar };
    layout === "profile"
      ? submitMutate(payload)
      : updateCustomerMutate(payload);
  };
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
                  <MDInput size="small" placeholder="First Name" />
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
                  <MDInput size="small" placeholder="Last Name" />
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
                    disabled={layout === "profile"}
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
                <InputPhoneBeta placeholder="Phone Number" />
              </Form.Item>
            </Form>
          </div>
        )}
        {loadingProfile ? (
          <MDSkeleton lines={1} />
        ) : (
          <div className={styles.moreInfo}>
            <span className={styles.label}>Role:</span>
            <span className={styles.result}>{profile?.role || "End user"}</span>
          </div>
        )}
        <div className={styles.groupButton} id="save_button">
          <div className={styles.shiningButton}>
            <MDButton
              size="small"
              type="primary"
              loading={updating || isUpdating}
              onClick={() => form.submit()}
            >
              Save
            </MDButton>
          </div>
        </div>
      </div>
      <div className={styles.blockContent}>
        {loadingProfile ? (
          <MDSkeleton lines={2} />
        ) : (
          <>
            <div className={styles.moreInfo}>
              <span className={styles.label}>Group:</span>
              <span className={styles.result}>Admin</span>
            </div>
            <div className={styles.moreInfo}>
              <span className={styles.label}>Timezone:</span>
              <span className={styles.result}>{profile?.timezone || "-"}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Information);
