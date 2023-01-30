import {
  useDebounceFn,
  useDidUpdate,
  useJob,
  useToggle,
} from "@moose-desk/core";
import {
  Combobox,
  ComboboxProps,
  Icon,
  Listbox,
  Stack,
  Tag,
  TextFieldProps,
} from "@shopify/polaris";
import { CustomerPlusMajor } from "@shopify/polaris-icons";
import { uniqBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { map, Observable } from "rxjs";

export interface SelectOptions {
  value: string | number;
  label: string;
  obj: any;
}

export interface SelectedObj {
  key: string;
  value: {
    label: string;
    [key: string]: any;
  };
}

interface SelectProps extends Omit<ComboboxProps, "activator"> {
  placeholder?: string;
  label: string;
  labelHidden?: boolean;
  options: SelectOptions[];
  value?: any[];
  onSearch?: (value: string) => any;
  onChange?: (selectedObj: SelectedObj[]) => void;
  activator?: React.ReactElement<TextFieldProps>;
}

export const Select = ({
  placeholder,
  label,
  labelHidden = false,
  value = [],
  onSearch,
  onChange,
  options,
  ...props
}: SelectProps) => {
  const [selectedOptions, setSelectedOptions] =
    useState<Array<string | number>>(value);
  const [selectedObj, setSelectedObj] = useState<SelectedObj[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [optionsData, setOptions] = useState<SelectOptions[]>(options);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(options);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = options.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [options]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (selectedOptions.includes(selected)) {
        setSelectedOptions(
          selectedOptions.filter((option: any) => option !== selected)
        );
        setSelectedObj(selectedObj.filter((option) => option.key !== selected));
      } else {
        const selectItemObj = optionsData.find(
          (item) => item.value === selected
        );

        if (props.allowMultiple) {
          setSelectedOptions([...selectedOptions, selected]);

          if (selectItemObj) {
            setSelectedObj([
              ...selectedObj,
              {
                key: selected,
                value: {
                  label: selectItemObj.label,
                  ...selectItemObj.obj,
                },
              },
            ]);
          }
          updateText("");
        } else {
          const matchedOption = options.find((option) => {
            return option.value.toString().match(selected);
          });
          setSelectedOptions([selected]);
          if (selectItemObj) {
            setSelectedObj([
              {
                key: selected,
                value: {
                  label: selectItemObj.label,
                  ...selectItemObj.obj,
                },
              },
            ]);
          }
          setInputValue((matchedOption && matchedOption.label) || "");
        }
      }
    },
    [options, selectedOptions, updateText, optionsData]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);

      setSelectedObj(selectedObj.filter((item) => options.includes(item.key)));
    },
    [selectedOptions]
  );

  const tagsMarkup = selectedObj.map((option) => (
    <Tag key={`option-${option.key}`} onRemove={removeTag(option.key)}>
      {option.value.label}
    </Tag>
  ));

  const optionsMarkup =
    optionsData.length > 0
      ? optionsData.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={String(value)}
              selected={selectedOptions.includes(value)}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  useEffect(() => {
    onChange && onChange(selectedObj);
  }, [selectedObj]);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const { run: onSearchDebounce } = useDebounceFn(
    () => {
      onSearch && onSearch(inputValue);
    },
    { wait: 100 }
  );

  useEffect(() => {
    onSearchDebounce();
  }, [inputValue]);

  return (
    <div>
      <Combobox
        {...props}
        activator={
          <Combobox.TextField
            prefix={<Icon source={() => <CustomerPlusMajor />} />}
            onChange={updateText}
            autoComplete="Combobox"
            label={label}
            labelHidden={labelHidden}
            value={inputValue}
            placeholder={placeholder || `Search ${label}`}
          />
        }
      >
        {props.allowMultiple ? (
          optionsMarkup ? (
            <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
          ) : null
        ) : (
          <>
            {options.length > 0 ? (
              <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
            ) : null}
          </>
        )}
      </Combobox>
      {props.allowMultiple && (
        <div className="pt-2">
          <Stack spacing="tight">{tagsMarkup}</Stack>
        </div>
      )}
    </div>
  );
};

// Select Ajax
export interface LoadMoreResult {
  options: SelectOptions[];
  canLoadMore: boolean;
  page?: number;
}

export interface LoadMoreValue {
  page: number;
  searchText: string;
  isFirst: boolean;
}

interface AjaxSelectProps extends Omit<SelectProps, "options" | "onSearch"> {
  loadMore: (params: LoadMoreValue) => Observable<LoadMoreResult>;
  renderOption?: (record: SelectOptions, index: number) => React.ReactNode;
  dependencies?: any[];
  dependenciesWait?: number;
  onDependenciesChanged?: () => void;
}

Select.Ajax = ({
  label,
  loadMore,
  renderOption,
  dependencies = [],
  dependenciesWait = 500,
  onDependenciesChanged,
  ...props
}: AjaxSelectProps) => {
  const {
    state: loading,
    on: startLoading,
    off: stopLoading,
  } = useToggle(false);
  const [options, setOptions] = useState<SelectOptions[]>([]);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isFirst, setIsFirst] = useState(true);

  const canFetch = useMemo(() => {
    return !loading && canLoadMore;
  }, [loading, canLoadMore]);

  const onPopupScroll = useCallback(() => {
    if (canFetch) {
      setPage((state) => state + 1);
    }
  }, [canFetch]);

  const fetchData = useCallback(() => {
    try {
      fetchDataApi({
        searchText: searchText,
        page: page,
        isFirst: isFirst,
      });
    } catch (error) {
      setCanLoadMore(false);
      setPage(1);
      setIsFirst(true);
    }
  }, [searchText, page, isFirst]);

  const { run: fetchDataApi } = useJob((params: LoadMoreValue) => {
    startLoading();
    return loadMore(params).pipe(
      map((data) => {
        stopLoading();
        setOptions((value) => {
          return (data.page ?? page) === 1
            ? [...data.options]
            : uniqBy([...value, ...data.options], "value");
        });
        setCanLoadMore(data.canLoadMore);
        setPage((value) => {
          return data.page ?? value;
        });
        setIsFirst(false);
      })
    );
  });

  useDidUpdate(() => {
    if (canFetch) {
      fetchData();
    }
  }, [searchText, page]);

  const onSearch = useCallback(async (text: string) => {
    setSearchText(text);
    setPage(1);
    setCanLoadMore(true);
  }, []);

  const { run: reloadData } = useDebounceFn(
    useCallback(() => {
      if (searchText !== "" || page !== 1) {
        setPage(1);
        setSearchText("");
      } else {
        fetchData();
      }
    }, [fetchData]),
    { wait: dependenciesWait }
  );

  useEffect(() => {
    onDependenciesChanged && onDependenciesChanged();
    setCanLoadMore(true);
    reloadData();
  }, [...(dependencies || [])]);

  return (
    <Select
      options={options}
      label={label}
      allowMultiple
      willLoadMoreOptions={false}
      onScrolledToBottom={canFetch ? onPopupScroll : undefined}
      onSearch={onSearch}
      {...props}
    ></Select>
  );
};

export default Select;
