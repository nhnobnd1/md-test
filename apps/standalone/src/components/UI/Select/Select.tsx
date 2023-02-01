import { useDebounceFn, useJob, useToggle } from "@moose-desk/core";
import { Select as AntSelect } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { SelectProps as AntSelectProps, SelectValue } from "antd/lib/select";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { map, Observable } from "rxjs";

export type OptionType = {
  value: string | number;
  label: string;
  additional_data?: any;
  obj?: any;
};

export interface SelectedObj {
  key: string;
  value: {
    label: string;
    [key: string]: any;
  };
}
interface SelectProps<VT extends SelectValue = any>
  extends Omit<AntSelectProps<VT>, "options" | "onChange"> {
  size?: SizeType;
  options?: OptionType[];
  onChange: (value: SelectedObj | string) => void;
}

const Select = ({ size = "middle", options, ...props }: SelectProps) => {
  return (
    <AntSelect
      {...props}
      options={options as any}
      optionFilterProp="label"
      size={size}
    />
  );
};

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export interface LoadMoreResult {
  options: OptionType[];
  canLoadMore: boolean;
  page?: number;
}

export interface LoadMoreValue {
  page: number;
  searchText: string;
  isFirst: boolean;
}

interface AjaxSelectProps extends SelectProps {
  loadMore: (params: LoadMoreValue) => Observable<LoadMoreResult>;
  renderOption?: (record: OptionType, index: number) => React.ReactNode;
  extra?: any;
  dependencies?: any[];
  dependenciesWait?: number;
  onFetched?: (
    response: LoadMoreResult,
    page: number,
    extra: any,
    dependencies: any[]
  ) => void;
  onDependenciesChanged?: () => void;
}

Select.Ajax = ({
  loadMore,
  renderOption,
  dependencies = [],
  dependenciesWait = 500,
  extra,
  onFetched,
  onDependenciesChanged,
  ...props
}: AjaxSelectProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { state: loading, on: startLoading, off: stopLoading } = useToggle();
  const [isFirst, setIsFirst] = useState(true);

  const canFetch = useMemo(() => {
    return !loading && canLoadMore;
  }, [loading, canLoadMore]);

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

  const { run: fetchDataDebounce } = useDebounceFn(
    () => {
      fetchData();
    },
    { wait: 300 }
  );

  const { run: fetchDataApi } = useJob((params: LoadMoreValue) => {
    startLoading();
    return loadMore(params).pipe(
      map((data) => {
        stopLoading();
        setOptions((value) => {
          return (data.page ?? page) === 1
            ? [...data.options]
            : _.uniqBy([...value, ...data.options], "value");
        });
        setCanLoadMore(data.canLoadMore);
        setPage((value) => {
          return data.page ?? value;
        });
        setIsFirst(false);
      })
    );
  });

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

  const onFocus = useCallback(async () => {
    if (options.length || !canFetch) {
      return;
    }
    setPage(1);
    fetchData();
  }, [options, fetchData, canFetch]);

  const onSearch = useCallback(async (text: string) => {
    setSearchText(text);
    setPage(1);
    setCanLoadMore(true);
  }, []);

  const onPopupScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (loading) {
        return;
      }

      const target = e.nativeEvent.target as HTMLDListElement;
      if (target.scrollHeight - target.scrollTop <= target.clientHeight * 2) {
        setPage((state) => state + 1);
      }
    },
    [loading, options, loadMore]
  );

  useEffect(() => {
    if (canFetch) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    if (canFetch) {
      fetchDataDebounce();
    }
  }, [searchText]);

  useEffect(() => {
    onDependenciesChanged && onDependenciesChanged();
    setCanLoadMore(true);
    reloadData();
  }, [...(dependencies || [])]);

  return (
    <Select
      {...props}
      options={renderOption ? undefined : options}
      onFocus={onFocus}
      loading={loading}
      onPopupScroll={onPopupScroll}
      onSearch={onSearch}
      showSearch={props.showSearch ?? true}
    >
      {renderOption
        ? _.uniqBy(options, "value").map((option, index) => (
            <Select.Option key={index} value={option.value}>
              {renderOption(option, index) as any}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

export default Select;
