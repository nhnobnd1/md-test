import { useDebounceFn, useToggle } from "@moose-desk/core";
import { Select as AntSelect } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { SelectProps as AntSelectProps, SelectValue } from "antd/lib/select";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface SelectProps<VT extends SelectValue = SelectValue>
  extends AntSelectProps<VT> {
  size?: SizeType;
}

const Select = ({ size = "middle", ...props }: SelectProps) => {
  return <AntSelect {...props} optionFilterProp="label" size={size} />;
};

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export type OptionType = {
  value: string | number;
  label: string;
  additional_data?: any;
};

export interface SelectFetchResponse {
  hasMore?: boolean;
  options: OptionType[];
}

export interface SelectFetchFunc {
  (
    searchText: string,
    page: number,
    extra: any,
    dependencies: any[]
  ): Promise<SelectFetchResponse>;
}

interface AjaxSelectProps extends SelectProps {
  fetchFunc: SelectFetchFunc;
  renderOption?: (record: OptionType, index: number) => React.ReactNode;
  extra?: any;
  dependencies?: any[];
  dependenciesWait?: number;
  onFetched?: (
    response: SelectFetchResponse,
    page: number,
    extra: any,
    dependencies: any[]
  ) => void;
  onDependenciesChanged?: () => void;
}

Select.Ajax = ({
  fetchFunc,
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
  const [hasMore, setHasMore] = useState(true);
  const { state: loading, on: startLoading, off: stopLoading } = useToggle();

  const canFetch = useMemo(() => {
    return !loading && hasMore;
  }, [loading, hasMore]);

  const updateStatesFromFetchResponse = useCallback(
    (fetchResponse: SelectFetchResponse) => {
      setOptions((state) => {
        if (page === 1) {
          return fetchResponse.options;
        }
        return [...state, ...fetchResponse.options];
      });
      setHasMore(fetchResponse.hasMore || false);

      onFetched && onFetched(fetchResponse, page, extra, dependencies);
    },
    [page, extra, dependencies, onFetched]
  );

  const fetchData = useCallback(async () => {
    startLoading();
    try {
      updateStatesFromFetchResponse(
        await fetchFunc(searchText, page, extra, dependencies)
      );
    } catch (error) {
      updateStatesFromFetchResponse({
        hasMore: false,
        options: [],
      });
    }
    stopLoading();
  }, [page, searchText, canFetch, dependencies, extra]);

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
    [loading, options, fetchFunc]
  );

  useEffect(() => {
    if (canFetch) {
      fetchData();
    }
  }, [searchText, page]);

  useEffect(() => {
    onDependenciesChanged && onDependenciesChanged();
    setHasMore(true);
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
              {renderOption(option, index)}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

export default Select;
