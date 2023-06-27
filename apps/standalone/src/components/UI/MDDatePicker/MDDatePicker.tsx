import { DatePicker } from "antd";
import useViewport from "src/hooks/useViewport";

interface IDatePickerProps {
  format: string;
  disabledDate: any;
  onChange: (date: any, values: string) => void;
}
export const MDDatePicker = ({
  format,
  disabledDate,
  onChange,
  ...props
}: IDatePickerProps) => {
  const { isMobile } = useViewport();
  return (
    <DatePicker
      format={format}
      disabledDate={disabledDate}
      onChange={onChange}
      size={isMobile ? "middle" : "large"}
      //   {...props}
    />
  );
};
