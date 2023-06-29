import { AutoComplete, AutoCompleteProps } from "antd";
import { FC, useState } from "react";
import useViewport from "src/hooks/useViewport";

interface AutoSelectProps extends AutoCompleteProps {}

export const AutoSelect: FC<AutoSelectProps> = ({ ...props }) => {
  const { isMobile } = useViewport();
  const [value, setValue] = useState<string>("");
  const filterOptions = props.options?.filter((item) =>
    (item.value as string)?.toLowerCase().includes(value?.toLowerCase())
  );

  return (
    <AutoComplete
      value={value}
      size={isMobile ? "middle" : "large"}
      {...props}
      options={filterOptions}
      onSearch={(e) => {
        setValue(e);
      }}
    />
  );
};
