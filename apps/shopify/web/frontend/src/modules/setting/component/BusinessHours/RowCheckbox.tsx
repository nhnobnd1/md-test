import { BusinessHours, Day } from "@moose-desk/repo";
import { Checkbox, Stack } from "@shopify/polaris";
import { isNumber } from "lodash-es";
import { useCallback, useEffect, useState } from "react";
import BoxSelectTime from "src/modules/setting/component/BusinessHours/BoxSelectTime";
import { initialValueCustomHours } from "src/modules/setting/constaint/constaint";
// import { initialValueCustomHours } from "src/modules/setting/constaint/constaint";

interface RowCheckboxProps {
  value?: BusinessHours[];
  onChange?: (value?: BusinessHours[]) => void;
  disabled?: boolean;
}

const RowCheckbox = ({ value, onChange, disabled }: RowCheckboxProps) => {
  const initialData = initialValueCustomHours.map((item) => ({
    day: item.day,
    timeRanges: {
      startTime: item.startTime,
      endTime: item.endTime,
    },
    checked: item.checked,
  }));

  const [valueCustomHours, setValueCustomHours] = useState<
    {
      day: Day;
      timeRanges: {
        startTime: string;
        endTime: string;
      };
      checked: boolean;
    }[]
  >(initialData);

  useEffect(() => {
    if (value) {
      setValueCustomHours((data) => {
        return data.map((item) => {
          const valueData = value.find((it) => it.day === item.day);
          if (valueData) {
            return { ...item, timeRanges: valueData.timeRanges, checked: true };
          } else {
            return { ...item, checked: false };
          }
        });
      });
    } else {
      setValueCustomHours(initialData);
    }
  }, [value]);

  const handleChangeChecked = useCallback(
    (newChecked: boolean, id: string) => {
      const indexChecked = valueCustomHours.findIndex(
        (option) => option.day === id
      );
      const payload = [...valueCustomHours];
      if (isNumber(indexChecked)) {
        payload[indexChecked].checked = newChecked;
        updateValueChange(payload);
      }
    },
    [valueCustomHours]
  );

  const handleChangeValueSelectTime = useCallback(
    (value, index) => {
      const payload = [...valueCustomHours];
      payload[index].timeRanges = { ...value };
      updateValueChange(payload);
    },
    [valueCustomHours, setValueCustomHours]
  );

  const updateValueChange = useCallback((valueCustom) => {
    let valueUpdate: BusinessHours[] = [];
    valueCustom.forEach((data: any) => {
      if (data.checked) {
        valueUpdate = [
          ...valueUpdate,
          {
            day: data.day,
            timeRanges: {
              startTime: data.timeRanges?.startTime,
              endTime: data.timeRanges?.endTime,
            },
          },
        ];
      }
    });
    onChange && onChange(valueUpdate);
  }, []);

  return (
    <>
      {valueCustomHours.map((day, index) => {
        return (
          <Stack key={day.day}>
            <Stack.Item>
              <div className="ml-4 w-40">
                <Checkbox
                  label={day.day}
                  checked={day.checked}
                  onChange={handleChangeChecked}
                  id={day.day}
                  disabled={disabled}
                />
              </div>
            </Stack.Item>
            <Stack.Item>
              <BoxSelectTime
                value={day}
                initialValue={[...valueCustomHours]}
                onChange={(value) => handleChangeValueSelectTime(value, index)}
                index={index}
                disabled={disabled}
              />
            </Stack.Item>
          </Stack>
        );
      })}
    </>
  );
};

export default RowCheckbox;
