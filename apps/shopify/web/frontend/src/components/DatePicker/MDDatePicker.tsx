import { DatePicker, DatePickerProps, Popover } from "@shopify/polaris";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { memo, useCallback, useState } from "react";
import { getTimeFilterDefault } from "src/modules/report/helper/convert";
import styles from "./style.module.scss";
dayjs.extend(timezone);
interface MDDatePicker extends DatePickerProps {
  type?: "start" | "end";
  onDateChange: (value: string) => void;
  datePickerClassName?: string;
  containerClassName?: string;
}
const MDDatePicker = ({
  type,
  onDateChange,
  datePickerClassName,
  containerClassName,
  ...props
}: // ...props
MDDatePicker) => {
  const dateNow = new Date();
  const { current, twoWeekAgo } = getTimeFilterDefault();

  const [visible, setVisible] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState<{
    start: Date;
    end: Date;
  }>();
  const handleSelectDate = (dates: { start: Date; end: Date }) => {
    const date = dates.start;
    onDateChange(dayjs(date).format("MM/DD/YYYY"));
    setSelectedDates(dates);

    setVisible(false);
  };
  const handleMonthChange = useCallback((month: number, year: number) => {
    setDate({ month, year });
  }, []);
  const showDatePicker = () => {
    setVisible(true);
  };
  const closeDatePicker = () => {
    setVisible(false);
  };
  const _renderValueDatePicker = () => {
    if (!type) return <div className={styles.placeholder}>MM/DD/YYYY</div>;
    return (
      <div className={styles.value}>
        {type === "start"
          ? selectedDates?.start
            ? dayjs(selectedDates?.start).format("MM/DD/YYYY")
            : twoWeekAgo.format("MM/DD/YYYY")
          : selectedDates?.end
          ? dayjs(selectedDates?.end).format("MM/DD/YYYY")
          : current.format("MM/DD/YYYY")}
      </div>
    );
  };
  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div className={styles.pickerBlock}>
        {!!type && <span>{type === "start" ? "From" : "To"}</span>}
      </div>
      <div className={classNames(styles.wrapDatePicker)}>
        <Popover
          active={visible}
          activator={
            <div
              className={classNames(styles.block, datePickerClassName)}
              onClick={showDatePicker}
            >
              {_renderValueDatePicker()}
            </div>
          }
          autofocusTarget="none"
          onClose={closeDatePicker}
        >
          <div className="p-5">
            <DatePicker
              month={month}
              year={year}
              onChange={handleSelectDate}
              onMonthChange={handleMonthChange}
              selected={selectedDates as any}
              {...props}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};
export default memo(MDDatePicker);
