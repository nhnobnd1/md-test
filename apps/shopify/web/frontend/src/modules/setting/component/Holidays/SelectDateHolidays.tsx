import {
  Button,
  DatePicker,
  Icon,
  Popover,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { CalendarMajor } from "@shopify/polaris-icons";
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

const SelectDateHolidays = ({
  valueDate,
  onChangeValueDate,
  error,
  value,
  onChange,
}: SelectDateHolidaysProps) => {
  const [valueState, setValueState] = useState<string>();
  const [popoverActive, setPopoverActive] = useState(true);

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
    <div>
      <Stack alignment="trailing">
        <div className="w-[150px]">
          <TextField
            autoComplete="off"
            label={
              <div>
                <span className="text-red">*</span> Date:
              </div>
            }
            value={
              selectedDates
                ? dayjs(selectedDates.start).format("DD-MM-YYYY")
                : ""
            }
            error={error}
          />
        </div>
        <div className={error ? "mb-8" : "mb-9px"}>
          <Text as="p" variant="bodyMd">
            to
          </Text>
        </div>
        <div className="w-[150px]">
          <TextField
            autoComplete="off"
            label="Date:"
            labelHidden
            value={
              selectedDates ? dayjs(selectedDates.end).format("DD-MM-YYYY") : ""
            }
            error={error}
          />
        </div>
        <div className={error ? "mb-6" : ""}>
          <Popover
            active={popoverActive}
            activator={
              <Button
                icon={() => (
                  <Icon
                    accessibilityLabel="select"
                    source={() => <CalendarMajor />}
                  />
                )}
                onClick={togglePopoverActive}
                disclosure
              ></Button>
            }
            autofocusTarget="first-node"
            onClose={togglePopoverActive}
          >
            <DatePicker
              month={month}
              year={dateNow.getFullYear()}
              onChange={(date) => handleChangeDate(date)}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange
            />
          </Popover>
        </div>
      </Stack>
      <div className="hidden">{valueState}</div>
    </div>
  );
};

export default memo(SelectDateHolidays);
