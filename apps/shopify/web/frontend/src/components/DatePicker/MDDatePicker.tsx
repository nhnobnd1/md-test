import { DatePicker, DatePickerProps, Popover } from "@shopify/polaris";
import classNames from "classnames";
import dayjs from "dayjs";
import { memo, useCallback, useState } from "react";
import styles from "./style.module.scss";
interface MDDatePicker extends DatePickerProps {
  type?: "start" | "end";
  onDateChange: (value: { start: Date; end: Date }) => void;
  datePickerClassName?: string;
  containerClassName?: string;
}
const MDDatePicker = ({
  type,
  onDateChange,
  datePickerClassName,
  containerClassName,
}: MDDatePicker) => {
  const [visible, setVisible] = useState(false);
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    end: new Date("Mon Mar 12 2018 00:00:00 GMT-0500 (EST)"),
  });
  const handleSelectDate = (dates: { start: Date; end: Date }) => {
    setSelectedDates(dates);
    onDateChange(dates);
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
    if (!type) return <div className={styles.placeholder}>DD/MM/YYYY</div>;
    return (
      <div className={styles.value}>
        {type === "start"
          ? dayjs(selectedDates?.start).format("DD/MM/YYYY")
          : dayjs(selectedDates?.end).format("DD/MM/YYYY")}
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
              selected={selectedDates}
              // {...props}
            />
          </div>
        </Popover>
      </div>
    </div>
  );
};
export default memo(MDDatePicker);
