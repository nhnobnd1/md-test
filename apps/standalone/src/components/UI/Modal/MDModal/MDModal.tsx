import { Drawer, Modal, ModalProps } from "antd";
import classNames from "classnames";
import { ReactNode } from "react";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
interface IMDModalProps extends ModalProps {
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
}
export const MDModal = ({
  className,
  onClose,
  children,
  ...props
}: IMDModalProps) => {
  const { isMobile } = useViewport();
  return !isMobile ? (
    <Modal
      className={classNames(styles.MDModal, className)}
      destroyOnClose
      closeIcon={<Icon name="close" />}
      {...props}
    >
      {children}
    </Modal>
  ) : (
    <Drawer
      className={classNames(styles.MDDrawer, className)}
      destroyOnClose
      closeIcon={<Icon name="close" />}
      {...props}
      height="unset"
      placement="bottom"
      onClose={() => onClose && onClose()}
    >
      {children}
    </Drawer>
  );
};
