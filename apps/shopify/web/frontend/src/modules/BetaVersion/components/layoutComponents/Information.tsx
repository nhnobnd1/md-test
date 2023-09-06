<<<<<<< HEAD
import { useUser } from "@moose-desk/core";
=======
import { uploadImage } from "@moose-beta/helper/api";
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
import { Agent } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import {
  ContextualSaveBar,
  DropZone,
  Icon,
  SkeletonBodyText,
} from "@shopify/polaris";
import { DeleteMajor, EditMajor } from "@shopify/polaris-icons";
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
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    if (profile?.avatar) {
      setAvatar(profile?.avatar);
    }
  }, [profile]);
  const convertListGroup = profile?.groupIds?.map(
    (group: { id: string; name: string }) => group?.name
  );
  const { mutate: uploadAvatarMutate, isLoading: uploading } = useMutation({
    mutationFn: (payload: any) => uploadImage(payload),
    onSuccess: ({ data }: any) => {
      if (data?.data?.urls?.length) {
        setAvatar(data?.data?.urls[0]);
        setChanged(true);
      }
    },
  });
  const { mutate: updateProfileMutate, isLoading: profileUpdating } =
    useMutation({
      mutationFn: (payload: any) => updateProfile(payload, profile?._id || ""),
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

<<<<<<< HEAD
      show(t("messages:success.agent_update"));
    },
    onError: () => {
      show(t("messages:error.agent_update"));
    },
  });
=======
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
  const handleRemoveAvatar = () => {
    setAvatar("");
    setChanged(true);
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
  const handleChangeForm = useCallback(() => {
    setChanged(formRef.current?.dirty || false);
  }, [formRef.current]);
  const handleUploadFile = (files: any) => {
    const file = files[0];
    if (file) {
<<<<<<< HEAD
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
=======
      uploadAvatarMutate(file);
    }
  };
  const loading = uploading || customerUpdating || profileUpdating;
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
  return (
    <>
      {changed && (
        <ContextualSaveBar
          fullWidth
          message={"Unsaved changes"}
          saveAction={{
            onAction: () => formRef.current?.submitForm(),
            loading: loading,
          }}
        />
      )}
      <div className={styles.contentWrap}>
        <div className={styles.blockContent}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              <MDAvatar
                firstName={profile?.firstName}
                lastName={profile?.lastName}
                email={profile?.email}
                source={avatar}
                skeleton={uploading}
              />

              <div className={styles.wrapActionAvatar}>
<<<<<<< HEAD
                {profile?.isActive && profile?.emailConfirmed && avatar && (
=======
                {avatar && (
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
                  <div
                    className={styles.removeAvatar}
                    onClick={handleRemoveAvatar}
                  >
                    <Icon source={DeleteMajor} color="base" />
                  </div>
                )}
<<<<<<< HEAD
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
=======
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
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
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
<<<<<<< HEAD
                  layout={layout}
                  beta
                  isSelf={profile?._id === userId}
                  disabled={isDisabledForm}
=======
                  beta
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
                />
              </>
            </div>
          )}
<<<<<<< HEAD
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
=======
          {loadingProfile ? (
            <SkeletonBodyText lines={1} />
          ) : (
            <div className={styles.moreInfo}>
              <span className={styles.label}>Role</span>
              <span className={styles.result}>
                {profile?.role || "End user"}
              </span>
            </div>
          )}
        </div>
        <div className={styles.blockContent}>
          {loadingProfile ? (
            <SkeletonBodyText lines={2} />
          ) : (
            <>
              <div className={styles.moreInfo}>
                <span className={styles.label}>Group</span>
                <span className={styles.result}>
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
                <span className={styles.label}>Timezone</span>
                <span className={styles.result}>
                  {profile?.timezone || "-"}
                </span>
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
              </div>
            </>
          )}
        </div>
<<<<<<< HEAD
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
=======
>>>>>>> 2989c34a (feat:done profile beta version in embedded)
      </div>
    </>
  );
};

export default React.memo(Information);
