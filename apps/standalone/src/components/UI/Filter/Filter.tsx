import { SearchOutlined, SortAscendingOutlined } from "@ant-design/icons";
import { Button, Input, Popover, PopoverProps } from "antd";
import { memo, useCallback, useEffect, useState } from "react";

interface FilterProps {
  content?: {
    name: string;
    option: PopoverProps;
  };
  initialvalueInput: string;
  onChange: (value: any) => void;
  placeholderInput?: string;
}

const Filter = (props: FilterProps) => {
  const [value, setValue] = useState();
  const [optionValue, setOptionValue] = useState<
    {
      key: string;
      value: any;
    }[]
  >([
    {
      key: "",
      value: "",
    },
  ]);
  const [valueInput, setValueInput] = useState(props.initialvalueInput);

  const handleChangeValueInput = useCallback((e) => {
    setValueInput(e.target.value);
  }, []);

  // handle Effect

  useEffect(() => {
    props.onChange &&
      props.onChange({
        inputValue: valueInput,
        optionValue: {
          ...optionValue,
        },
      });
  }, [optionValue, valueInput]);
  useEffect(() => {
    setValueInput(props.initialvalueInput);
  }, [props]);
  return (
    <div className="flex">
      <Input
        placeholder={props.placeholderInput}
        prefix={<SearchOutlined />}
        className={props.content ? "mr-2" : ""}
        value={valueInput}
        onChange={handleChangeValueInput}
      />
      {props.content ? (
        <Popover {...props.content.option}>
          <Button icon={<SortAscendingOutlined />} className="pl-4 pr-4">
            {props.content?.name}
          </Button>
        </Popover>
      ) : null}
    </div>
  );
};

export default memo(Filter);
