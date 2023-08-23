import { Modal } from "antd";
import React from "react";
import useViewport from "src/hooks/useViewport";
import styles from "./modal.module.scss";
interface IProps {
  okText: string;
  title: string;
  contentText: string;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  loading?: boolean;
}
export const MDModalConfirm = React.memo(
  ({
    title,
    contentText,
    okText,
    visible,
    onCancel,
    onOk,
    loading = false,
  }: IProps) => {
    const { isMobile } = useViewport();
    return (
      <Modal
        width={isMobile ? 300 : 400}
        okText={okText}
        className={styles.modalConfirm}
        okButtonProps={{
          className: styles.removeButton,
          loading,
        }}
        cancelButtonProps={{
          className: styles.cancelButton,
        }}
        open={visible}
        onCancel={onCancel}
        onOk={onOk}
        title={title}
      >
        <p>{contentText}</p>
      </Modal>
    );
  }
);
