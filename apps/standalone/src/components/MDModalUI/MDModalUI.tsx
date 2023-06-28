import { Drawer, Modal, ModalProps } from "antd";
import { FC } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";

interface MDModalUIProps extends ModalProps {}

export const MDModalUI: FC<MDModalUIProps> = ({ children, ...props }) => {
  const { isMobile } = useViewport();
  return !isMobile ? (
    <Modal
      okButtonProps={{ size: "large" }}
      cancelButtonProps={{ size: "large" }}
      destroyOnClose
      closeIcon={<Icon name="close" />}
      {...props}
    >
      {children}
    </Modal>
  ) : (
    <Drawer
      destroyOnClose
      footer={[
        <MDButton
          key="back"
          onClick={(e: any) => {
            props.onCancel && props.onCancel(e);
          }}
        >
          {props.cancelText ?? "Cancel"}
        </MDButton>,
        <MDButton
          key="submit"
          type="primary"
          danger={props.okText !== "Save"}
          // loading={loading}
          onClick={(e: any) => {
            props.onOk && props.onOk(e);
          }}
        >
          {props.okText ?? "Delete"}
        </MDButton>,
      ]}
      {...props}
      height="unset"
      placement="bottom"
      closable={false}
      onClose={(e: any) => {
        props.onCancel && props.onCancel(e);
      }}
      footerStyle={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      {children}
    </Drawer>
  );
};
