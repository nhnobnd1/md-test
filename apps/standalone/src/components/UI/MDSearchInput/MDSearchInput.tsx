import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";

interface IMDSearchInput extends InputProps {
  placeholder?: string;
  // onChange: () => void;
  value: string;
}
export const MDSearchInput = ({
  placeholder = "search",
  // onChange,
  value,
  ...props
}: IMDSearchInput) => {
  const { Search } = Input;

  return (
    <Input
      placeholder={placeholder}
      value={value}
      // onChange={onChange}
      suffix={<SearchOutlined />}
      {...props}
    />
  );
};
