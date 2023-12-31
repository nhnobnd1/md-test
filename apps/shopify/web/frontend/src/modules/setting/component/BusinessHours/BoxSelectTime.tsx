import { Combobox, Icon, Listbox, Stack, Text } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import { memo, useCallback, useEffect, useState } from "react";
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
  ...props
}: BoxSelectTimeProps) => {
  const [timeWorking, setTimeWorking] = useState(0);
  const [disabledTextField, setDisabledTextField] = useState<boolean>();
  const [selectedOptionStart, setSelectedOptionStart] = useState();
  const [selectedOptionEnd, setSelectedOptionEnd] = useState();
  // value start
  const [inputValueStart, setInputValueStart] = useState("");
  const [optionsStart, setOptionsStart] = useState(optionSelectTime);
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
    [optionsStart, selectedOptionEnd, initialValue]
  );
  const optionsMarkupStart = optionsStart.map((option) => {
    const { label, value } = option;
    return (
      <Listbox.Option
        key={`${value}`}
        value={value}
        selected={selectedOptionStart === value}
        accessibilityLabel={label}
        disabled={disabledTextField}
      >
        {label}
      </Listbox.Option>
    );
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
    [optionsEnd, selectedOptionStart, initialValue]
  );
  const optionsMarkupEnd = optionsEnd.map((option) => {
    const { label, value } = option;

    return (
      <Listbox.Option
        key={`${value}`}
        value={value}
        selected={selectedOptionEnd === value}
        accessibilityLabel={label}
        disabled={disabledTextField}
      >
        {label}
      </Listbox.Option>
    );
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
      // onChange && onChange(value);
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
      <Stack spacing="extraTight" alignment="center">
        <div style={{ maxWidth: 130 }}>
          <Combobox
            activator={
              <Combobox.TextField
                label=""
                labelHidden
                value={inputValueStart}
                autoComplete="off"
                suffix={
                  <Icon source={() => <ChevronDownMinor />} color="base" />
                }
                disabled={disabledTextField}
              />
            }
            height="300px"
          >
            {
              <Listbox onSelect={updateSelectionStart}>
                {optionsMarkupStart}
              </Listbox>
            }
          </Combobox>
        </div>
        <div className="ml-4 mr-4">
          <Text as="span" variant="bodyMd">
            to
          </Text>
        </div>
        <div style={{ maxWidth: 130 }}>
          <Combobox
            activator={
              <Combobox.TextField
                label=""
                labelHidden
                value={inputValueEnd}
                suffix={
                  <Icon source={() => <ChevronDownMinor />} color="base" />
                }
                autoComplete="off"
                disabled={disabledTextField}
              />
            }
            height="300px"
          >
            <Listbox onSelect={updateSelectionEnd}>{optionsMarkupEnd}</Listbox>
          </Combobox>
        </div>
        <div className="w-32 pl-4">
          <Text as="span" variant="bodyMd">
            {`(${timeWorking} hours)`}
          </Text>
        </div>
      </Stack>
    </div>
  );
};

export default memo(BoxSelectTime);
