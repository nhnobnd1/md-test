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
import { useCallback, useEffect, useState } from "react";

interface SelectDateHolidaysProps {
  value?: {
    start: Date;
    end: Date;
  };
  onChange?: (value: any) => void;
}

const SelectDateHolidays = ({ value, onChange }: SelectDateHolidaysProps) => {
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

  // useEffect(() => {
  //   onChange && onChange(selectedDates);
  // }, [selectedDates]);

  useEffect(() => {
    console.log("valueDate", value);
    if (value?.start) {
      setSelectedDates(value);
    } else {
      setSelectedDates(undefined);
    }
  }, [value]);
  return (
    <Stack alignment="trailing">
      <div className="w-28">
        <TextField
          autoComplete="off"
          label="Date:"
          value={
            selectedDates ? dayjs(selectedDates.start).format("DD-MM-YYYY") : ""
          }
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
          onChange={(date) => {
            setSelectedDates(date);
            onChange && onChange(date);
          }}
          onMonthChange={handleMonthChange}
          selected={selectedDates}
          multiMonth
          allowRange
        />
      </Popover>
    </Stack>
  );
};

export default SelectDateHolidays;
