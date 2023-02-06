import { Combobox, Icon, Listbox, Stack, Text } from "@shopify/polaris";
import { ChevronDownMinor } from "@shopify/polaris-icons";
import { useCallback, useEffect, useState } from "react";
import { optionSelectTime } from "src/modules/setting/constaint/constaint";

interface BoxSelectTimeProps {
  value: {
    id: string;
    checked: boolean;
    timeRanges: {
      startTime: string;
      endTime: string;
    };
  };
  initialValue: {
    id: string;
    checked: boolean;
    timeRanges: {
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
  ...props
}: BoxSelectTimeProps) => {
  const [timeWorking, setTimeWorking] = useState(0);
  const [disabled, setDisabled] = useState(false);
  // value start
  const [selectedOptionStart, setSelectedOptionStart] = useState("");
  const [inputValueStart, setInputValueStart] = useState("");
  const [optionsStart, setOptionsStart] = useState(optionSelectTime);
  const updateSelectionStart = useCallback(
    (selected) => {
      const matchedOption = optionsStart.find((option) => {
        return option.value.match(selected);
      });
      setSelectedOptionStart(selected);
      onChange &&
        onChange(() => {
          initialValue[index].timeRanges.startTime = selected;
          return [...initialValue];
        });
      setInputValueStart((matchedOption && matchedOption.label) || "");
    },
    [optionsStart]
  );
  const optionsMarkupStart = optionsStart.map((option) => {
    const { label, value } = option;

    return (
      <Listbox.Option
        key={`${value}`}
        value={value}
        selected={selectedOptionStart === value}
        accessibilityLabel={label}
        disabled={disabled}
      >
        {label}
      </Listbox.Option>
    );
  });

  // value End
  const [selectedOptionEnd, setSelectedOptionEnd] = useState("");
  const [inputValueEnd, setInputValueEnd] = useState("");
  const [optionsEnd, setOptionsEnd] = useState(optionSelectTime);

  const updateSelectionEnd = useCallback(
    (selected) => {
      const matchedOption = optionsEnd.find((option) => {
        return option.value.match(selected);
      });
      onChange &&
        onChange(() => {
          initialValue[index].timeRanges.endTime = selected;
          return [...initialValue];
        });
      setSelectedOptionEnd(selected);
      setInputValueEnd((matchedOption && matchedOption.label) || "");
    },
    [optionsEnd]
  );
  const optionsMarkupEnd = optionsEnd.map((option) => {
    const { label, value } = option;

    return (
      <Listbox.Option
        key={`${value}`}
        value={value}
        selected={selectedOptionEnd === value}
        accessibilityLabel={label}
        disabled={disabled}
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
    updateSelectionStart(value?.timeRanges.startTime);
    updateSelectionEnd(value?.timeRanges.endTime);
  }, [value]);

  useEffect(() => {
    if (props.disabled) {
      setDisabled(props.disabled);
    } else setDisabled(!initialValue[index]?.checked);
  }, [props.disabled]);
  useEffect(() => {
    setDisabled(!initialValue[index]?.checked);
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
                disabled={disabled}
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
                disabled={disabled}
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

export default BoxSelectTime;
