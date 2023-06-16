import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
interface IProps {
  onChange?: (dates: { start: string; end: string }) => void;
  defaultDisabledTime: {
    start: string;
    end: string;
  };
}
export const MDRangePicker = ({ onChange, defaultDisabledTime }: IProps) => {
  const { RangePicker } = DatePicker;
  const { start, end } = defaultDisabledTime;
  const [dates, setDates] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  useEffect(() => {
    setDates({
      start,
      end,
    });
  }, []);
  const handleChangeDate = (_: any, datesString: string[]) => {
    if (datesString[0]) {
      setDates({ start: datesString[0], end: datesString[1] });
      onChange &&
        onChange({
          start: datesString[0],
          end: datesString[1],
        });
      return;
    }
    setDates({
      start,
      end,
    });
  };

  return (
    <RangePicker
      format={"MM/DD/YYYY"}
      value={[dayjs(dates.start, "MM/DD/YYYY"), dayjs(dates.end, "MM/DD/YYYY")]}
      onChange={handleChangeDate}
      disabledDate={(current) => {
        // console.log(dayjs(dates.end).subtract(14, "days").format("DD/MM/YYYY"));
        return (
          (current &&
            (current < dayjs(dates.end).subtract(14, "days") ||
              current > dayjs())) ||
          current > dayjs(dates.start).add(2, "weeks")
        );
      }}
    />
  );
};
