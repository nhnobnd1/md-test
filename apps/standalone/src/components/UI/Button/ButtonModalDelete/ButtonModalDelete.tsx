import { Button, ButtonProps, ModalProps, Tooltip } from "antd";
import { useState } from "react";
import Icon from "src/components/UI/Icon";
import { ModalDelete } from "src/components/UI/Modal/ModalDelete";
import "./ButtonModalDelete.scss";
import { MDButton } from "src/components/UI/Button/MDButton";
interface ButtonModalDeleteProps {
  onlyIcon?: boolean;
  title: string;
  description: string;
  onClick?: () => void;
  onConfirm?: () => void;
  onClosePopup?: () => void;
  loading?: boolean;
  children?: any;
  buttonProps?: Omit<ButtonProps, "onClick">;
  modalProps?: Omit<ModalProps, "title" | "description" | "onCancel" | "onOk">;
  textDelete?: string;
  okeText?: string;
  disabled?: boolean;
}

export const ButtonModalDelete = ({
  onlyIcon = false,
  title,
  description,
  loading = false,
  buttonProps = {},
  modalProps = {},
  onClick,
  onConfirm,
  onClosePopup,
  textDelete,
  okeText,
  disabled,
}: ButtonModalDeleteProps) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {onlyIcon ? (
        <Tooltip placement="top" title={"Delete"}>
          <Button
            type="text"
            onClick={() => {
              onClick && onClick();
              setOpenModal(true);
            }}
            icon={<Icon name="delete" />}
            {...buttonProps}
            disabled={disabled}
          ></Button>
        </Tooltip>
      ) : (
        <MDButton
          danger
          type="primary"
          onClick={() => {
            onClick && onClick();
            setOpenModal(true);
          }}
          icon={<Icon name="delete" />}
          {...buttonProps}
          disabled={disabled}
        >
          {textDelete && !onlyIcon ? textDelete : undefined}
        </MDButton>
      )}
      <ModalDelete
        open={openModal}
        onCancel={() => {
          onClosePopup && onClosePopup();
          setOpenModal(false);
        }}
        loading={loading}
        centered
        title={title}
        description={description}
        destroyOnClose
        onOk={() => {
          setOpenModal(false);
          onConfirm && onConfirm();
        }}
        // width={386}
        okText={okeText ?? textDelete}
        {...modalProps}
      />
    </>
  );
};
