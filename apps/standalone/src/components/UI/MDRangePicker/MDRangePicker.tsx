import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import Icon from "src/components/UI/Icon";
import { useSubdomain } from "src/hooks/useSubdomain";
import { getTimeFilterDefault } from "src/modules/report/helper/convert";
import "./rangePicker.scss";
const { RangePicker } = DatePicker;

// interface IProps {}
type RangeValue = [Dayjs | null, Dayjs | null] | null;
interface IProps {
  onFilterChange: (params: any) => void;
}
const MDRangePicker = ({ onFilterChange }: IProps) => {
  // const { isMobile } = useViewport();
  const { current, twoWeekAgo } = getTimeFilterDefault();
  const { subDomain } = useSubdomain();
  const { timezone } = useGlobalData(false, subDomain || "");
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>(null);
  useEffect(() => {
    setDates([twoWeekAgo?.tz(timezone), current?.tz(timezone)]);
  }, [timezone]);
  const disabledDate = (current: Dayjs) => {
    if (!dates) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 14;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 14;
    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };
  return (
    <RangePicker
      className="md-range-picker"
      popupClassName="md-popup-range-picker"
      format="MM/DD/YYYY"
      value={dates || value}
      disabledDate={disabledDate}
      suffixIcon={<Icon name="calendar" />}
      onCalendarChange={(val) => {
        setDates(val);
      }}
      onChange={(val) => {
        setValue(val);
        onFilterChange(val);
      }}
      // size={isMobile ? "middle" : "large"}
      onOpenChange={onOpenChange}
      // changeOnBlur
    />
  );
};

export default MDRangePicker;
