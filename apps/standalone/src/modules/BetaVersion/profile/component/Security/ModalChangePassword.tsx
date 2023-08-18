import {
  MediaScreen,
  useCountDown,
  useNavigate,
  useSearchParams,
  useToggle,
  useUnMount,
} from "@moose-desk/core";
import { QUERY_KEY } from "@moose-desk/core/helper/constant";
import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Form } from "src/components/UI/Form";
import { MDInput } from "src/components/UI/Input";
import { MDModal } from "src/components/UI/Modal/MDModal";
import useMessage from "src/hooks/useMessage";
import useNotification from "src/hooks/useNotification";
import useViewport from "src/hooks/useViewport";
import {
  getRecoveryCodes,
  getStatus2FA,
  updatePassword,
} from "src/modules/setting/api/api";
import { RequestPasswordPayload } from "src/modules/setting/helper/interface";
import { rulesValidatePassword } from "src/regex";
import styles from "./style.module.scss";
interface IProps {
  visible: boolean;
  onClose: () => void;
}
export const ModalChangePassword = React.memo(
  ({ onClose, visible }: IProps) => {
    const { t } = useTranslation();
    const notification = useNotification();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const querySearch = searchParams.get("recovery");
    const { isMobile } = useViewport(MediaScreen.LG);
    const message = useMessage();
    const [form] = Form.useForm();
    const {
      state: visibleRecoveryCodeModal,
      off: handleCloseRecoveryCodeModal,
      on: handleOpenRecoveryCodeModal,
    } = useToggle(false);
    const {
      clearCountDown,
      initCountdown: startCountDown,
      state: countDown,
    } = useCountDown({
      initValue: 10,
      key: "countdownRecoveryCode",
    });
    useEffect(() => {
      if (!querySearch) return;
      if (querySearch === "true") {
        handleOpenRecoveryCodeModal();
      }
    }, [querySearch]);
    useUnMount(() => clearCountDown("countdownRecoveryCode"));
    const { data, isFetching }: any = useQuery({
      queryKey: ["2faRecoveryCodes"],
      queryFn: () => getRecoveryCodes(),
      keepPreviousData: true,
      enabled: visibleRecoveryCodeModal,
      onSuccess: () => startCountDown("countdownRecoveryCode"),
    });
    const {
      data: statusSecurity,
      isLoading,
      refetch: fetchingStatus,
    }: any = useQuery({
      queryKey: [QUERY_KEY.TWO_FA_STATUS],
      queryFn: () => getStatus2FA(),
    });
    const method = useMemo(() => {
      return {
        show: statusSecurity?.data?.data?.twoFactorEnabled,
        method: statusSecurity?.data?.data?.twoFactorMethod || "Disabled",
      };
    }, [statusSecurity]);
    const status = useMemo(() => {
      return statusSecurity?.data?.data?.twoFactorStoreEnabled || false;
    }, [statusSecurity]);
    // update password
    const { mutate: updatePasswordMutate, isLoading: updating } = useMutation({
      mutationFn: (payload: RequestPasswordPayload) => updatePassword(payload),
      onMutate: () => {
        message.loading.show(t("messages:loading.updating_password"));
      },
      onSuccess: () => {
        message.loading.hide();
        notification.success(t("messages:success.change_password"));
        handleResetForm();
      },
      onError: (error: any) => {
        message.loading.hide();
        if (error.response.status === 400) {
          if (error.response.data.error[0] === "PASSWORD_NOT_MATCH") {
            notification.error("Current Password not match! Please try again.");
          }
        } else {
          notification.error(
            "System error. Please try again in a few minutes!"
          );
        }
      },
    });

    // name method
    // reset form
    const handleResetForm = useCallback(() => {
      form.resetFields();
    }, []);
    // modal
    const [open2FA, setOpen2FA] = useState(false);
    const handleCloseRecoveryCodes = useCallback(() => {
      handleCloseRecoveryCodeModal();
      navigate("/setting/account&security/security");
    }, []);
    const handleAcceptRequestCodes = useCallback(() => {
      handleOpenRecoveryCodeModal();
    }, []);
    const handleCloseModal = useCallback(() => {
      form.resetFields();
      onClose();
    }, []);
    return (
      <MDModal
        open={visible}
        //   className={stylesModal.modalCustomer}
        onCancel={handleCloseModal}
        onClose={handleCloseModal}
        footer={null}
      >
        <div className={styles.wrapContentModal}>
          <h3>Change Password</h3>
          <div className={styles.wrapForm}>
            <Form
              form={form}
              onFinish={updatePasswordMutate}
              onReset={handleResetForm}
              layout="vertical"
              enableReinitialize
            >
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[
                  ...rulesValidatePassword,
                  {
                    required: true,
                    message: "The Current Password is required",
                  },
                ]}
              >
                <MDInput
                  autoComplete="off"
                  type="password"
                  placeholder="Current Password"
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  ...rulesValidatePassword,
                  {
                    required: true,
                    message: "The New Password is required",
                  },
                ]}
              >
                <MDInput
                  minLength={8}
                  type="password"
                  autoComplete="off"
                  placeholder="New Password"
                />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                dependencies={["newPassword"]}
                label="Confirm New Password"
                rules={[
                  {
                    required: true,
                    message: "The Confirm New Password is required",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The confirmation password is not match!")
                      );
                    },
                  }),
                ]}
              >
                <MDInput
                  minLength={8}
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm New Password"
                />
              </Form.Item>
              <div
                className={classNames(
                  styles.groupButton,
                  isMobile ? "text-left-button" : "text-right"
                )}
              >
                <MDButton htmlType="submit" type="primary" loading={updating}>
                  Update Password
                </MDButton>
              </div>
            </Form>
          </div>
        </div>
      </MDModal>
    );
  }
);
