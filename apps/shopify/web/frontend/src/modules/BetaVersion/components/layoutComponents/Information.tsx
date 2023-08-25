import { Agent } from "@moose-desk/repo";
import { useToast } from "@shopify/app-bridge-react";
import { Button, DropZone, Icon, SkeletonBodyText } from "@shopify/polaris";
import { EditMajor } from "@shopify/polaris-icons";
import { FormikProps } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";
import MDAvatar from "src/components/MDAvatar/MDAvatar";
import { updateCustomer } from "src/modules/customers/api/api";
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
      default:
        return () => {};
    }
  };
  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, [formRef.current]);
  const loading = uploading || customerUpdating || profileUpdating;

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
              {/* {avatar && (
                <div
                  className={styles.removeAvatar}
                  onClick={handleRemoveAvatar}
                >
                  <Icon name="delete" />
                </div>
              )} */}
              <div className={styles.edit}>
                <Icon source={EditMajor} color="base" />
                <div className={styles.dropzone}>
                  <DropZone>
                    <DropZone.FileUpload />
                  </DropZone>
                </div>
                {/* <Upload
                  name="avatar"
                  // listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => {
                    return false;
                  }}
                  onChange={handleChange}
                >
                  <Icon name="edit" color="#8C8C8C" />
                </Upload> */}
              </div>
            </div>
          </div>
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
          </div>
        )}
        {loadingProfile ? (
          <SkeletonBodyText lines={1} />
        ) : (
          <div className={styles.moreInfo}>
            <span className={styles.label}>Role</span>
            <span className={styles.result}>{profile?.role || "End user"}</span>
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
              <span className={styles.result}>{profile?.timezone || "-"}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Information);
