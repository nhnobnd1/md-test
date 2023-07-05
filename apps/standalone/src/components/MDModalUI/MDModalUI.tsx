import { Drawer, Modal, ModalProps } from "antd";
import { FC } from "react";
import { MDButton } from "src/components/UI/Button/MDButton";
import useViewport from "src/hooks/useViewport";

interface MDModalUIProps extends ModalProps {}

export const MDModalUI: FC<MDModalUIProps> = ({ children, ...props }) => {
  const { isMobile } = useViewport();
  const css = `
  .ant-modal-header{
    margin-bottom:0!important
  }
  `;
  return !isMobile ? (
    <>
      <style scoped>{css}</style>
      <Modal
        okButtonProps={{ size: "large", className: "text-sm" }}
        cancelButtonProps={{ size: "large", className: "text-sm" }}
        destroyOnClose
        // closeIcon={<Icon name="close" />}

        {...props}
        title={<div className="mb-5">{props.title}</div>}
      >
        {children}
      </Modal>
    </>
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
