import { useNavigate } from "@moose-desk/core";
import classNames from "classnames";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
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
          "flex items-center mb-0 pb-0 w-full overflow-auto",
          { "justify-center": justify === "center" },
        ])}
      >
        {back && (
          <MDButton
            className="  mr-2 flex justify-center items-center"
            type="text"
            onClick={() => (backAction ? backAction() : navigate(-1))}
            icon={<Icon name="back" />}
          />
        )}
        {title && <h1 className="m-0">{title}</h1>}
        {subTitle && <h2>{subTitle}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Header;
