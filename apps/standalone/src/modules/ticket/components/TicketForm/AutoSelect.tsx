import { PlusOutlined } from "@ant-design/icons";
import { emailRegex } from "@moose-desk/core";
import { AutoComplete, AutoCompleteProps, Button } from "antd";
import { FC, useRef, useState } from "react";
import useViewport from "src/hooks/useViewport";
interface AutoSelectProps extends AutoCompleteProps {
  setOpenModalCustomer?: (value: boolean) => void;
}

export const AutoSelect: FC<AutoSelectProps> = ({
  setOpenModalCustomer,
  ...props
}) => {
  const { isMobile } = useViewport();
  const [value, setValue] = useState<string>("");
  const filterOptions = props.options?.filter((item) =>
    (item.value as string)?.toLowerCase().includes(value?.toLowerCase())
  );
  const inputRef = useRef<any>(null);

  const NotFoundContent = () => {
    return (
      <div className="w-full">
        <Button
          className="w-full text-left"
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            if (emailRegex.test(value)) {
              inputRef.current?.blur();
              setOpenModalCustomer && setOpenModalCustomer(true);
            }
          }}
        >
          Add new contact
        </Button>
      </div>
    );
  };

  return (
    <AutoComplete
      ref={inputRef}
      value={value}
      size={isMobile ? "middle" : "large"}
      {...props}
      options={filterOptions}
      onSearch={(e) => {
        setValue(e);
        props.onSearch && props.onSearch(e);
      }}
      notFoundContent={props.notFoundContent ? <NotFoundContent /> : null}
    />
  );
};
