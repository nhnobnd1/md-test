import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@moose-desk/core";
import { Button } from "antd";
import classNames from "classnames";
import styles from "./style.module.scss";
interface HeaderProps {
  back?: boolean;
  backAction?: () => void;
  title?: string | React.ReactElement;
  justify?: "start" | "end" | "center";
  children?: React.ReactNode;
  className?: string;
  subTitle?: string;
}

export const Header = ({
  back = false,
  backAction,
  title,
  subTitle,
  justify,
  children,
  className = "",
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className={classNames(styles.MDHeader, className)}>
      <div
        className={classNames([
          "flex items-center mb-0 pb-0",
          { "justify-center": justify === "center" },
        ])}
      >
        {back && (
          <Button
            className="w-9 h-9 mr-4 flex justify-center items-center"
            onClick={() => (backAction ? backAction() : navigate(-1))}
          >
            <LeftOutlined />
          </Button>
        )}
        {title && <h1>{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Header;
