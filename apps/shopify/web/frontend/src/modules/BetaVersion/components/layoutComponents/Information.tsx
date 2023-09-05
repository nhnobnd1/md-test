import { useUser } from "@moose-desk/core";
import { Agent } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, DropZone, Icon, SkeletonBodyText } from "@shopify/polaris";
import { EditMajor } from "@shopify/polaris-icons";
import { FormikProps } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import { updateAgent } from "src/modules/agent/api/api";
import { SettingStatus } from "src/modules/agent/components/SettingStatus/SettingStatus";
import { updateCustomer } from "src/modules/customers/api/api";
import { FileSize } from "src/modules/customers/helper/enum";
import { updateProfile } from "src/modules/setting/api/api";
import ProfileForm from "src/modules/setting/component/ProfileForm";
import styles from "./style.module.scss";
const LIST_HONORIFIC = ["Mr", "Mrs", "Ms"];

interface IProps {
  layout: "profile" | "customer";
  profile: Agent | any;
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
  const { show } = useToast();
  const { sub: userId }: string | any = useUser();
  const formRef = useRef<FormikProps<any>>(null);

  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (profile?.avatar) {
      setAvatar(profile?.avatar);
    }
  }, [profile]);
  const convertListGroup = profile?.groupIds?.map(
    (group: { id: string; name: string }) => group?.name
  );
  const { mutate: uploadAvatarMutate, isLoading: uploading } = useMutation({
    // mutationFn: (payload: any) => postImageApi(payload),

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
        show(t("messages:success.update_profile"));
      },
      onError: () => {
        show(t("messages:error.update_profile"));
      },
    });

  const { mutate: updateCustomerMutate, isLoading: customerUpdating } =
    useMutation({
      mutationFn: (payload: any) => updateCustomer(profile?._id || "", payload),
      onSuccess: async () => {
        onRefetch();
        show(t("messages:success.update_customer"));
      },
      onError: () => {
        show(t("messages:error.update_customer"));
      },
    });
  const { mutate: updateAgentMutate, isLoading: agentUpdating } = useMutation({
    mutationFn: (payload: any) => updateAgent(profile?._id || "", payload),
    onSuccess: async () => {
      onRefetch();

      show(t("messages:success.agent_update"));
    },
    onError: () => {
      show(t("messages:error.agent_update"));
    },
  });
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
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);
  const handleUploadFile = (files: any) => {
    const file = files[0];
    if (file) {
      if (file.size > FileSize.MAX) {
        show("Size of the image must not exceed 3MB.");
        return;
      }
      if (!file.type.includes("image")) {
        show("Invalid image format.");
        return;
      }
      uploadAvatarMutate(file);
    }
  };
  const loading =
    uploading || customerUpdating || profileUpdating || agentUpdating;
  const isDisabledForm =
    !(profile?.isActive && profile?.emailConfirmed) && layout === "agent";
  return (
    <div className={styles.contentWrap}>
      <div className={styles.blockContent}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <MDAvatar
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              email={profile?.email}
              source={avatar}
            />

              <div className={styles.wrapActionAvatar}>
                {profile?.isActive && profile?.emailConfirmed && avatar && (
                  <div
                    className={styles.removeAvatar}
                    onClick={handleRemoveAvatar}
                  >
                    <Icon source={DeleteMajor} color="base" />
                  </div>
                )}
                {!isDisabledForm && (
                  <div className={styles.edit}>
                    <Icon source={EditMajor} color="base" />
                    <div className={styles.dropzone}>
                      <DropZone
                        accept=".png, .jpg, .jpeg, .svg"
                        onDrop={handleUploadFile}
                      >
                        <DropZone.FileUpload />
                      </DropZone>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {loadingProfile ? (
            <SkeletonBodyText lines={4} />
          ) : (
            <div className={styles.formInfo}>
              <>
                <ProfileForm
                  updateForm={handleChangeForm}
                  ref={formRef}
                  initialValues={profile}
                  submit={handleSubmitProfile}
                  layout={layout}
                  beta
                  isSelf={profile?._id === userId}
                  disabled={isDisabledForm}
                />
              </>
            </div>
          )}
          {layout !== "agent" && (
            <>
              {loadingProfile ? (
                <SkeletonBodyText lines={1} />
              ) : (
                <div className={styles.moreInfo}>
                  <span className={styles.label}>Role</span>
                  <span className={styles.result}>{profile?.role || "-"}</span>
                </div>
              )}
            </>
          )}
        </div>
        {loadingProfile ? (
          <SkeletonBodyText lines={4} />
        ) : (
          <div className={styles.formInfo}>
            <>
              <ProfileForm
                updateForm={() => {}}
                ref={formRef}
                initialValues={profile}
                submit={handleSubmitProfile}
                beta
              />
              <div className={styles.groupButton}>
                <Button
                  primary
                  onClick={handleSubmitForm}
                  loading={loading}
                  disabled={!formRef.current?.dirty}
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
        {layout === "agent" && profile?._id && profile?._id !== userId && (
          <div>
            {loadingProfile ? (
              <SkeletonBodyText lines={2} />
            ) : (
              <>
                <SettingStatus
                  confirmed={profile?.emailConfirmed}
                  id={profile?._id}
                  onRefetch={onRefetch}
                  email={profile?.email}
                  storeId={profile?.storeId}
                  isActive={profile?.isActive}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Information);
