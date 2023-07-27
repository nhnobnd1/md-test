import {
  LegacyCard,
  ResourceItem,
  ResourceList,
  Text,
  Tooltip,
} from "@shopify/polaris";
import { FC, useState } from "react";
import { ButtonDelete } from "src/components/Button/ButtonDelete";
interface AttachForWard {
  uid: string;
  name: string;
  url: string;
}
interface UploadForwardProps {
  defaultFileList: AttachForWard[];
  setFileForward: any;
}

export const UploadForward: FC<UploadForwardProps> = ({
  defaultFileList,
  setFileForward,
}) => {
  const [fileList, setFileList] = useState<AttachForWard[]>(defaultFileList);
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: "attachFile", plural: "attachFile" }}
        items={fileList}
        renderItem={(item) => {
          const { uid, url, name } = item;

          return (
            <ResourceItem
              id={uid}
              url={url}
              accessibilityLabel={`View details for ${name}`}
            >
              <div className="flex justify-between items-center ">
                <div className="xs:max-w-[200px] sm:max-w-[300px]">
                  <Tooltip preferredPosition="above" content={name}>
                    <Text truncate variant="bodyMd" fontWeight="bold" as="h3">
                      {name}
                    </Text>
                  </Tooltip>
                </div>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileForward(
                      fileList
                        .filter((item) => item.uid !== uid)
                        .map((item) => item?.uid)
                    );
                    setFileList(fileList.filter((item) => item.uid !== uid));
                  }}
                >
                  <ButtonDelete plain />
                </span>
              </div>
            </ResourceItem>
          );
        }}
      />
    </LegacyCard>
  );
};
