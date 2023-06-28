import { ModalProps } from "antd";
import { MDModalUI } from "src/components/MDModalUI";
import "./ModalDelete.scss";
interface ModalDeleteProps extends Omit<ModalProps, "title"> {
  title: string;
  description: string;
  loading?: boolean;
}

export const ModalDelete = ({
  title,
  description,
  loading,
  ...props
}: ModalDeleteProps) => {
  return (
    <MDModalUI
      {...props}
      title={title}
      okText={props.okText ?? "Delete"}
      // okButtonProps={{
      //   type: "primary",
      //   danger: true,
      //   loading: loading,
      //   size: "large",
      // }}
      // closeIcon={<Icon name="close" />}
      width={props.width ?? "700px"}
      cancelText={props.cancelText ?? "Cancel"}
    >
      <p>{description}</p>
    </MDModalUI>
  );
};

export default ModalDelete;
