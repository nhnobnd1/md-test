import { generatePath, useNavigate, useRole } from "@moose-desk/core";
import { Card } from "antd";
import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import { RolePermission } from "src/constaint/RolePermission";
import { ChannelTitle } from "src/constaint/SettingChannel";
import RightIcon from "~icons/material-symbols/arrow-right";
import "./CategoryChannel.scss";

interface CategoryChannelProps {
  title: string;
  description?: string;
  link: string;
  className?: string;
  icon?: ReactNode;
}

const CategoryChannel = ({
  title,
  description,
  className,
  link,
  icon,
}: CategoryChannelProps) => {
  const navigate = useNavigate();
  const role = useRole();
  const disableButton = useMemo(() => {
    if (
      role === RolePermission.BasicAgent &&
      title === ChannelTitle.WebFormConfiguration
    )
      return true;
    return false;
  }, [role]);
  return (
    <Card
      className={classNames(
        className,
        `${disableButton ? "pointer-events-none" : ""}`
      )}
      onClick={() => navigate(generatePath(link))}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="flex text-[20px]">{icon}</span>
            <h3 className="m-0">{title}</h3>
          </div>
          <div className="text-gray-500">{description}</div>
        </div>
        <div>
          <div className="">
            <RightIcon style={{ fontSize: 32 }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryChannel;
