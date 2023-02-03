import { generatePath, useNavigate } from "@moose-desk/core";
import { Button, Card } from "antd";
import { ReactNode } from "react";
import CarbonCloudSatelliteConfig from "~icons/carbon/cloud-satellite-config";
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
  return (
    <Card
      className={className}
      type="inner"
      title={
        <div className="flex items-center gap-4">
          <span className="flex text-[20px]">{icon}</span>
          <span>{title}</span>
        </div>
      }
    >
      <div className="flex justify-between items-center">
        <div>{description}</div>
        <div>
          <Button
            type="default"
            icon={
              <span className="mr-2">
                <CarbonCloudSatelliteConfig />
              </span>
            }
            onClick={() => navigate(generatePath(link))}
          >
            Configure
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CategoryChannel;