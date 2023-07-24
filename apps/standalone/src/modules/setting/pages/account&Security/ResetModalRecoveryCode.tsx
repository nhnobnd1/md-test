import { useToggle } from "@moose-desk/core";
import { Typography } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import { Header } from "src/components/UI/Header";
import { MDModal } from "src/components/UI/Modal/MDModal";
import styles from "./styles.module.scss";
interface IProps {
  onOpenModalRecoveryCode: () => void;
  loading?: boolean;
  buttonTitle?: string;
  countDown?: number;
}
export const ResetModalRecoveryCode = React.memo(
  ({
    buttonTitle = "Get recovery codes",
    loading = false,
    countDown = 0,
    onOpenModalRecoveryCode,
  }: IProps) => {
    const { state: visible, on, off } = useToggle(false);
    const [loadingRecoveryCode, setLoadingRecoveryCode] = useState(false);

    const handleAccept = () => {
      off();
      onOpenModalRecoveryCode();
    };
    const handleOpenModalConfirm = () => {
      on();
    };
    return (
      <div className="d-flex align-center">
        {!countDown ? null : (
          <Typography.Text type="success" className="mr-2">
            ({countDown}s)
          </Typography.Text>
        )}
        <MDButton
          type="link"
          onClick={handleOpenModalConfirm}
          loading={loading}
          disabled={!!countDown}
        >
          {buttonTitle}
        </MDButton>

        <MDModal
          open={visible}
          onCancel={off}
          onClose={off}
          className={styles.confirmRecoveryCodeModal}
          footer={
            <div className={classNames(styles.footerButton, "text-right")}>
              <MDButton onClick={off}>Cancel</MDButton>

              <MDButton
                onClick={handleAccept}
                type="primary"
                className="ml-4"
                loading={loadingRecoveryCode}
              >
                OK
              </MDButton>
            </div>
          }
        >
          <div className={styles.title}>
            <Header subTitle="Are you sure you want to request new recovery codes?" />
          </div>
          <div className={styles.content}>
            Your previous recovery codes will be replaced and will no longer be
            valid.
          </div>
        </MDModal>
      </div>
    );
  }
);
