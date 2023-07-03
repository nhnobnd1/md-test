import { DatePicker } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCallback, useEffect, useState } from "react";
import useViewport from "src/hooks/useViewport";

interface SelectDateHolidaysProps {
  valueDate?: {
    startDate: Date;
    endDate: Date;
  };
  onChangeValueDate?: (value: { startDate: Date; endDate: Date }) => void;
  error?: string;
  value?: string;
  onChange?: (value: any) => void;
}

const SelectDateHolidays = ({
  valueDate,
  onChangeValueDate,
  error,
  value,
  onChange,
}: SelectDateHolidaysProps) => {
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current < dayjs().endOf("day") && current.year() !== dayjs().year();
  };
  const { isMobile } = useViewport();

  const [selectedDates, setSelectedDates] =
    useState<[startDate: Dayjs, endDate: Dayjs]>();

  const handleChangeDate = useCallback(
    ([startDate, endDate]) => {
      setSelectedDates([startDate, endDate]);
      onChangeValueDate &&
        onChangeValueDate({
          startDate: startDate.toDate(),
          endDate: endDate.toDate(),
        });
      onChange && onChange(`${startDate}`);
    },
    [onChangeValueDate, onChange]
  );

  useEffect(() => {
    if (valueDate?.startDate) {
      setSelectedDates([dayjs(valueDate.startDate), dayjs(valueDate.endDate)]);
      onChange && onChange(`${valueDate.startDate}`);
    } else {
      setSelectedDates(undefined);
    }
  }, [valueDate]);
  return (
    <div>
      <RangePicker
        className="xs:h-[32px] md:h-[40px]"
        size={isMobile ? "middle" : "large"}
        disabledDate={disabledDate}
        value={selectedDates}
        format="MM/DD/YYYY"
        onChange={(dates) => handleChangeDate(dates)}
        status={error ? "error" : undefined}
      />
      <div hidden>{value}</div>
    </div>
  );
};

export default SelectDateHolidays;
