import { Drawer, DrawerProps } from "antd";
import { ReactNode } from "react";

interface IMDDrawerProps extends DrawerProps {
  onClose: () => void;
  visible: boolean;
  content?: ReactNode;
}
export const MDDrawer = ({
  visible,
  onClose,
  content = "Empty content",
  ...props
}: IMDDrawerProps) => {
  return (
    <Drawer
      title="Basic Drawer"
      closable={false}
      onClose={onClose}
      open={visible}
      {...props}
    >
      {content}
    </Drawer>
  );
};
