import { Button, DatePicker, DatePickerProps, Popover } from "@shopify/polaris";
import { CalendarMinor } from "@shopify/polaris-icons";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { memo, useCallback, useEffect, useState } from "react";
import { getTwoWeeksAfter } from "src/modules/report/helper/convert";
import styles from "./style.module.scss";
dayjs.extend(timezone);
interface MDDatePicker extends DatePickerProps {
  datePickerClassName?: string;
  containerClassName?: string;
  onSubmitTime: (dates: { start: Date; end: Date }) => void;
  defaultRangeTime: {
    start: string;
    end: string;
  };
}

const formatRenderDate = (date?: Date) => {
  if (!date) return "";
  return dayjs(date).format("MM/DD/YYYY");
};
const MDDatePicker = ({
  datePickerClassName,
  containerClassName,
  defaultRangeTime,
  onSubmitTime,
}: MDDatePicker) => {
  const dateNow = new Date();

  const convertDefault = {
    start: dayjs(defaultRangeTime?.start).toDate(),
    end: dayjs(defaultRangeTime?.end).toDate(),
  };
  const [visible, setVisible] = useState(false);
  const [{ month, year }, setDate] = useState({
    month: dateNow.getMonth(),
    year: dateNow.getFullYear(),
  });
  const [selectedDates, setSelectedDates] = useState<{
    start: Date;
    end: Date;
  }>();
  useEffect(() => {
    setSelectedDates(convertDefault);
  }, [defaultRangeTime]);
  const handleSelectDate = (dates: { start: Date; end: Date }) => {
    setSelectedDates(dates);
  };
  const handleClearDatesSelected = () => {
    setSelectedDates(undefined);
  };
  const handleApplyDates = () => {
    if (
      !selectedDates?.start ||
      !selectedDates?.end ||
      selectedDates.start === selectedDates.end
    )
      return;
    onSubmitTime({
      start: dayjs(selectedDates?.start).toDate(),
      end: dayjs(selectedDates?.end).toDate(),
    });
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
    setSelectedDates(convertDefault);
  };
  return (
    <div className={classNames(styles.container, containerClassName)}>
      <div className={classNames(styles.wrapDatePicker)}>
        <Popover
          active={visible}
          activator={
            <Button icon={CalendarMinor} onClick={showDatePicker}>
              {formatRenderDate(selectedDates?.start || convertDefault?.start)}{" "}
              - {formatRenderDate(selectedDates?.end || convertDefault?.end)}
            </Button>
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
              disableDatesBefore={
                selectedDates?.start ? selectedDates.start : undefined
              }
              disableDatesAfter={
                selectedDates?.start
                  ? getTwoWeeksAfter(selectedDates.start).toDate()
                  : undefined
              }
              allowRange
            />
            <div className={styles.groupActionButton}>
              <div className={styles.clearBtn}>
                <Button onClick={handleClearDatesSelected}>Clear</Button>
              </div>
              <div className={styles.submitBtn}>
                <Button
                  disabled={
                    !selectedDates?.start ||
                    !selectedDates?.end ||
                    selectedDates.start === selectedDates.end
                  }
                  onClick={handleApplyDates}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  );
};
export default memo(MDDatePicker);
