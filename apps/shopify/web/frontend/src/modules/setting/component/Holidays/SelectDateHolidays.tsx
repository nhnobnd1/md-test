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
  onChange?: (value: any) => void;
  value?: string;
}

const SelectDateHolidays = ({
  valueDate,
  onChangeValueDate,
  error,
  onChange,
  value,
}: SelectDateHolidaysProps) => {
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
    setSelectedDates(date);
    onChangeValueDate &&
      onChangeValueDate({
        startDate: date.start,
        endDate: date.end,
      });
    onChange && onChange(date.start);
  }, []);
  useEffect(() => {
    console.log("err", error);
  }, [error]);

  useEffect(() => {
    if (valueDate?.startDate) {
      console.log(1);
      setSelectedDates({
        start: valueDate.startDate,
        end: valueDate.endDate,
      });
    } else {
      setSelectedDates(undefined);
    }
  }, [valueDate]);
  return (
    <Stack alignment="trailing">
      <div className="w-28">
        <TextField
          autoComplete="off"
          label="Date:"
          value={
            selectedDates ? dayjs(selectedDates.start).format("DD-MM-YYYY") : ""
          }
          error={error}
        />
      </div>
      <div className="mb-1">
        <Text as="p" variant="bodyMd">
          to
        </Text>
      </div>
      <div className="w-28">
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
    </Stack>
  );
};

export default memo(SelectDateHolidays);
