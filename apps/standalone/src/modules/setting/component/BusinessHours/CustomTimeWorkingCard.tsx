import { BusinessHours, Day } from "@moose-desk/repo";
import { Checkbox, Space } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useCallback, useEffect, useMemo, useState } from "react";
import BoxSelectTime from "src/modules/setting/component/BusinessHours/BoxSelectTime";
import {
  initialValueCustomHours,
  optionDay,
} from "src/modules/setting/constaint/constaint";

interface RowCheckboxProps {
  value?: BusinessHours[];
  onChange?: (value?: BusinessHours[]) => void;
  disabled?: boolean;
}

const CustomTimeWorkingCard = ({
  value,
  onChange,
  disabled,
  ...props
}: RowCheckboxProps) => {
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
    (e: CheckboxChangeEvent) => {
      const indexChecked = valueCustomHours.findIndex(
        (option) => option.day === e.target.value
      );
      setValueCustomHours((initialValue) => {
        initialValue[indexChecked].checked = e.target.checked;
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
      {valueCustomHours.map((day, index) => (
        <Space align="center" key={index} className="mt-4">
          <div className="w-40">
            <Checkbox
              checked={day.checked}
              onChange={handleChangeChecked}
              value={day.day}
              disabled={disabled}
            >
              {optionDay[index]}
            </Checkbox>
          </div>
          <Space align="center" size={20}>
            <BoxSelectTime
              value={day}
              initialValue={valueCustomHours}
              onChange={(value) => handleChangeValueSelectTime(value, index)}
              index={index}
              disabled={disabled}
            />
          </Space>
        </Space>
      ))}
    </>
  );
};

export default CustomTimeWorkingCard;
