import {
  useDebounceFn,
  useDidUpdate,
  useJob,
  useToggle,
} from "@moose-desk/core";
import {
  Combobox,
  ComboboxProps,
  EmptySearchResult,
  Listbox,
  Stack,
  Tag,
  TextFieldProps,
} from "@shopify/polaris";
import { uniqBy } from "lodash-es";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Observable, map } from "rxjs";

export interface SelectOptions {
  value: string | number;
  label: string;
  obj?: any;
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
  renderOption?: (record: SelectOptions, index: number) => string;
  options: SelectOptions[];
  chooseRefresh?: boolean;
  disableValues?: any[];
  showTag?: boolean;
  loading?: boolean;
  value?: any[];
  onSearch?: (value: string) => any;
  onChange?: (selectedObj: SelectedObj[] | SelectedObj) => void;
  activator?: React.ReactElement<TextFieldProps>;
}

export const Select = ({
  placeholder,
  label,
  labelHidden = false,
  value = [],
  renderOption,
  chooseRefresh = false,
  showTag = false,
  loading = false,
  disableValues = [],
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
        onSearch && onSearch("");
        return;
      } else {
        onSearchDebounce(value);
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
          if (chooseRefresh) {
            updateText("");
          }
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

  const loadingMarkup = loading ? (
    <Listbox.Loading accessibilityLabel="loading" />
  ) : null;

  useEffect(() => {
    if (props.allowMultiple) {
      onChange && onChange(selectedObj);
    } else {
      onChange && selectedObj.length && onChange(selectedObj[0]);
    }
  }, [selectedObj]);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const { run: onSearchDebounce } = useDebounceFn(
    (text: string) => {
      onSearch && onSearch(text);
    },
    { wait: 100 }
  );
  return (
    <div>
      <Combobox
        {...props}
        activator={
          <Combobox.TextField
            // prefix={<Icon source={() => <CustomerPlusMajor />} />}
            onChange={updateText}
            onFocus={() => {
              setInputValue("");
              onSearch && onSearch("");
            }}
            onBlur={() => {
              if (optionsData.length === 0) {
                setInputValue("");
              }
            }}
            autoComplete="Combobox"
            label={label}
            labelHidden={labelHidden}
            value={inputValue}
            verticalContent={
              props.allowMultiple &&
              showTag && (
                <>
                  <Stack spacing="tight">{tagsMarkup}</Stack>
                </>
              )
            }
            placeholder={placeholder || `Search ${label}`}
          />
        }
      >
        {optionsData.length > 0 ? (
          <Listbox onSelect={updateSelection}>
            {optionsData.map((option, index) => (
              <Listbox.Option
                key={`${option.value}`}
                value={String(option.value)}
                selected={selectedOptions.includes(option.value)}
                disabled={disableValues.includes(option.value as any)}
                accessibilityLabel={option.label}
              >
                {renderOption ? renderOption(option, index) : option.label}
              </Listbox.Option>
            ))}
            {loadingMarkup}
          </Listbox>
        ) : (
          <div className="p-3 h-[100px]">
            <EmptySearchResult
              title={
                "Sorry! There is no records matched with your search criteria"
              }
              description={"Try changing the filters or search term"}
            />
          </div>
        )}
      </Combobox>
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
  dependencies?: any[];
  dependenciesWait?: number;
  onDependenciesChanged?: () => void;
}

Select.Ajax = ({
  label,
  loadMore,
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
  }, [searchText, page, isFirst, options]);

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
        data.page && setPage(data.page);
        setIsFirst(false);
      })
    );
  });

  useDidUpdate(() => {
    if (canFetch) {
      fetchData();
    }
  }, [searchText, page]);

  const onSearch = useCallback(
    async (text: string) => {
      setSearchText(text);
      setPage(1);
      setCanLoadMore(true);
    },
    [page, setPage]
  );

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
      loading={loading}
      label={label}
      willLoadMoreOptions={false}
      onScrolledToBottom={canFetch ? onPopupScroll : undefined}
      onSearch={onSearch}
      {...props}
    ></Select>
  );
};

export default Select;
