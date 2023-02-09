import { BusinessHours, Day } from "@moose-desk/repo";
import { Checkbox, Stack } from "@shopify/polaris";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const initValue = useMemo(() => {
    const initialValue = initialData?.map((data: any) => {
      if (value?.length) {
        const valueMatch = value.find((initData) => initData.day === data.day);
        if (valueMatch) {
          return {
            day: valueMatch.day,
            timeRanges: {
              startTime: valueMatch.timeRanges.startTime,
              endTime: valueMatch.timeRanges.endTime,
            },
            checked: true,
          };
        }
      }
      return data;
    });
    return initialValue;
  }, [value, initialData]);
  const [valueCustomHours, setValueCustomHours] = useState<
    {
      day: Day;
      timeRanges: {
        startTime: string;
        endTime: string;
      };
      checked: boolean;
    }[]
  >(initValue);

  const handleChangeChecked = useCallback(
    (newChecked: boolean, id: string) => {
      const indexChecked = valueCustomHours.findIndex(
        (option) => option.day === id
      );
      setValueCustomHours((initialValue) => {
        initialValue[indexChecked].checked = newChecked;
        return [...initialValue];
      });
    },
    [valueCustomHours]
  );

  const handleChangeValueSelectTime = useCallback(
    (value, index) => {
      setValueCustomHours((init) => {
        init[index].timeRanges = { ...value };
        return [...init];
      });
    },
    [valueCustomHours]
  );
  // useEffect(() => {
  //   value?.map((data: BusinessHours) => {
  //     return {};
  //   });
  // }, [value]);
  useEffect(() => {
    let valueUpdate: BusinessHours[] = [];
    valueCustomHours.forEach((data) => {
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
  }, [valueCustomHours]);
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
                initialValue={valueCustomHours}
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
