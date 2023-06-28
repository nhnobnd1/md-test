import { Select, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { optionSelectTime } from "src/modules/setting/constaint/constaint";

interface BoxSelectTimeProps {
  value: {
    checked?: boolean;
    day?: string;
    timeRanges?: {
      startTime: string;
      endTime: string;
    };
  };
  initialValue: {
    checked?: boolean;
    day?: string;
    timeRanges?: {
      startTime: string;
      endTime: string;
    };
  }[];
  index: number;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const BoxSelectTime = ({
  index,
  onChange,
  value,
  initialValue,
  disabled,
}: BoxSelectTimeProps) => {
  const [timeWorking, setTimeWorking] = useState(0);
  const [disabledTextField, setDisabledTextField] = useState<boolean>();
  const [selectedOptionStart, setSelectedOptionStart] = useState();
  const [selectedOptionEnd, setSelectedOptionEnd] = useState();
  // value start
  const [inputValueStart, setInputValueStart] = useState("");
  const [optionsStart] = useState(optionSelectTime);
  const updateSelectionStart = useCallback(
    (selected) => {
      const matchedOption = optionsStart.find((option) => {
        return option.value.match(selected);
      });
      setSelectedOptionStart(selected);
      onChange &&
        onChange({
          startTime: selected,
          endTime: selectedOptionEnd,
        });
      setInputValueStart((matchedOption && matchedOption.label) || "");
    },
    [optionsStart, selectedOptionEnd]
  );
  const optionsMarkupStart = optionsStart.map((option) => {
    const { label, value } = option;
    return { label, value };
  });

  // value End
  const [inputValueEnd, setInputValueEnd] = useState("");
  const [optionsEnd, setOptionsEnd] = useState(optionSelectTime);

  const updateSelectionEnd = useCallback(
    (selected) => {
      const matchedOption = optionsEnd.find((option) => {
        return option.value.match(selected);
      });
      onChange &&
        onChange({
          startTime: selectedOptionStart,
          endTime: selected,
        });

      setSelectedOptionEnd(selected);
      setInputValueEnd((matchedOption && matchedOption.label) || "");
    },
    [optionsEnd, selectedOptionStart]
  );
  const optionsMarkupEnd = optionsEnd.map((option) => {
    const { label, value } = option;

    return { label, value };
  });
  // time working
  const handleTimeWorking = useCallback(() => {
    const start = optionSelectTime.find(
      (option) => option.value === selectedOptionStart
    );
    const end = optionSelectTime.find(
      (option) => option.value === selectedOptionEnd
    );
    if (start && end) {
      setTimeWorking(end.valueSelect - start.valueSelect);
    }
  }, [selectedOptionStart, selectedOptionEnd]);

  // handle Disabled

  const handleSetDisabled = useCallback(() => {
    if (disabled) {
      setDisabledTextField(true);
    } else {
      if (initialValue[index].checked) {
        setDisabledTextField(false);
      } else {
        setDisabledTextField(true);
      }
    }
  }, [initialValue, index, disabled]);
  // middle
  const handleSlelected = useCallback(
    (value: { startTime: any; endTime: any }) => {
      setSelectedOptionStart(value.startTime);
      setSelectedOptionEnd(value.endTime);
      const matchedOptionStart = optionsStart.find((option) => {
        return option.value.match(value.startTime);
      });
      const matchedOptionEnd = optionsEnd.find((option) => {
        return option.value.match(value.endTime);
      });
      setInputValueStart(
        (matchedOptionStart && matchedOptionStart.label) || ""
      );
      setInputValueEnd((matchedOptionEnd && matchedOptionEnd.label) || "");
      onChange && onChange(value);
    },
    []
  );
  // handle Effect

  useEffect(() => {
    const indexStart = optionsStart.findIndex(
      (option) => option.value === selectedOptionStart
    );
    setOptionsEnd(optionSelectTime.slice(indexStart));
    handleTimeWorking();
  }, [selectedOptionStart]);

  useEffect(() => {
    handleTimeWorking();
  }, [selectedOptionEnd]);

  useEffect(() => {
    if (value?.timeRanges?.startTime && value?.timeRanges?.endTime) {
      handleSlelected({
        startTime: value?.timeRanges?.startTime,
        endTime: value?.timeRanges?.endTime,
      });
    }
  }, [value]);

  useEffect(() => {
    handleSetDisabled();
  }, [disabled]);

  useEffect(() => {
    handleSetDisabled();
  }, [initialValue]);

  return (
    <div className="mb-2">
      <Space align="center" className="flex flex-wrap">
        <div style={{ maxWidth: 130 }}>
          <Select
            value={inputValueStart}
            disabled={disabledTextField}
            onChange={updateSelectionStart}
            options={optionsMarkupStart}
          ></Select>
        </div>
        <div className="ml-4 mr-4 w-[20px]">
          <Typography.Text>to</Typography.Text>
        </div>
        <div style={{ maxWidth: 130 }}>
          <Select
            value={inputValueEnd}
            disabled={disabledTextField}
            options={optionsMarkupEnd}
            onChange={updateSelectionEnd}
          ></Select>
        </div>
        <div className="w-32 pl-4">
          <Typography.Text>{`(${timeWorking} hours)`}</Typography.Text>
        </div>
      </Space>
    </div>
  );
};

export default BoxSelectTime;
