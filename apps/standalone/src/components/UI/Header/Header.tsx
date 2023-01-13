import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "@moose-desk/core";
import { Button } from "antd";
import classNames from "classnames";

interface HeaderProps {
  back?: boolean;
  title: string | React.ReactElement;
  children?: React.ReactNode;
  className?: string;
}

export const Header = ({
  back = false,
  title,
  children,
  className = "",
}: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className={classNames([className, "mb-5"])}>
      <div className="flex items-center mb-0 pb-0">
        {back && (
          <Button
            className="w-9 h-9 mr-4 flex justify-center items-center"
            onClick={() => navigate(-1)}
          >
            <LeftOutlined />
          </Button>
        )}
        <h2 className="translate-y-[4px]">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Header;
