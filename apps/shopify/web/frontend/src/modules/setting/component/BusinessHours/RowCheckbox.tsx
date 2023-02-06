import { Checkbox, Stack } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import BoxSelectTime from "src/modules/setting/component/BusinessHours/BoxSelectTime";
import { initialValueCustomHours } from "src/modules/setting/constaint/constaint";

interface RowCheckboxProps {
  value?: {
    day: string;
    timeRanges: {
      startTime: string;
      endTime: string;
    };
  }[];
  onChange?: () => void;
  disabled?: boolean;
}

const RowCheckbox = (props: RowCheckboxProps) => {
  const initValue = [...initialValueCustomHours];
  const [valueCustomHours, setValueCustomHours] = useState<
    {
      id: string;
      checked: boolean;
      timeRanges: {
        startTime: string;
        endTime: string;
      };
    }[]
  >(initValue);

  const handleChangeChecked = useCallback(
    (newChecked: boolean, id: string) => {
      const indexChecked = valueCustomHours.findIndex(
        (option) => option.id === id
      );
      setValueCustomHours((initialValue) => {
        initialValue[indexChecked].checked = newChecked;
        return [...initialValue];
      });
    },
    [valueCustomHours]
  );
  useEffect(() => {
    console.log("valueCustomHours", valueCustomHours);
  }, [valueCustomHours]);

  useEffect(() => {}, [props.disabled]);
  return (
    <>
      {valueCustomHours.map((day, index) => {
        return (
          <Stack key={day.id}>
            <Stack.Item>
              <div className="ml-4 w-40">
                <Checkbox
                  label={day.id}
                  checked={day.checked}
                  onChange={handleChangeChecked}
                  id={day.id}
                  disabled={props.disabled}
                />
              </div>
            </Stack.Item>
            <Stack.Item>
              <BoxSelectTime
                value={day}
                onChange={setValueCustomHours}
                initialValue={valueCustomHours}
                index={index}
                disabled={props.disabled}
              />
            </Stack.Item>
          </Stack>
        );
      })}
    </>
  );
};

export default RowCheckbox;
