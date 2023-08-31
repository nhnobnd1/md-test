import { DatePicker, Icon, Popover, TextField } from "@shopify/polaris";
import { CalendarMinor } from "@shopify/polaris-icons";
import dayjs from "dayjs";
import { memo, useCallback, useEffect, useState } from "react";

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
const formatRenderDate = (date?: Date | string) => {
  if (!date) return "";
  if (typeof date === "string") {
    return dayjs(date, "MM/DD/YYYY").format("MM/DD/YYYY");
  }
  return dayjs(date, "ddd MMM DD YYYY HH:mm:ss [GMT]Z (zzz)").format(
    "MM/DD/YYYY"
  );
};
const SelectDateHolidays = ({
  valueDate,
  onChangeValueDate,
  error,
  value,
  onChange,
}: SelectDateHolidaysProps) => {
  const [valueState, setValueState] = useState<string>();
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const dateNow = new Date();
  const [month, setMonth] = useState(dateNow.getMonth());
  const [selectedDates, setSelectedDates] = useState<{
    start: Date;
    end: Date;
  }>();
  const showDatePicker = () => {
    setPopoverActive(true);
  };
  const handleMonthChange = useCallback((month) => setMonth(month), []);
  const handleChangeDate = useCallback((date: { start: Date; end: Date }) => {
    onChange && onChange(`${date.start.getDate()}`);
    setSelectedDates(date);
    onChangeValueDate &&
      onChangeValueDate({
        startDate: date.start,
        endDate: date.end,
      });
  }, []);

  useEffect(() => {
    if (valueDate?.startDate) {
      setSelectedDates({
        start: valueDate.startDate,
        end: valueDate.endDate,
      });
      onChange && onChange(`${valueDate.startDate.getDate()}`);
    } else {
      setSelectedDates(undefined);
    }
  }, [valueDate]);
  useEffect(() => {
    if (value) {
      setValueState(value);
    }
  }, [value]);
  return (
    <div style={{ width: 250 }}>
      <div className={error ? "mb-6" : ""}>
        <Popover
          active={popoverActive}
          activator={
            <TextField
              onFocus={showDatePicker}
              autoComplete="off"
              label={
                <div>
                  <span className="text-red">*</span> Date:
                </div>
              }
              value={
                selectedDates
                  ? `${formatRenderDate(
                      selectedDates?.start
                    )} - ${formatRenderDate(selectedDates?.end)}`
                  : ""
              }
              error={error}
              prefix={<Icon source={CalendarMinor} color="base" />}
            />
          }
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <div className="p-5">
            <DatePicker
              month={month}
              year={dateNow.getFullYear()}
              onChange={(date) => handleChangeDate(date)}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange
            />
          </div>
        </Popover>
      </div>
      <div className="hidden">{valueState}</div>
    </div>
  );
};

export default memo(SelectDateHolidays);
