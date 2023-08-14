import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Input, InputProps } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
interface IMDSearchInput extends InputProps {
  value?: string;
  placeholder?: string;
  onTypeSearch: (keyword: string) => void;
}
export const MDSearchInput = React.memo(
  ({
    placeholder = "Search",
    onTypeSearch,
    value,
    ...props
  }: IMDSearchInput) => {
    const { isMobile } = useViewport();
    const [querySearch, setQuerySearch] = useState<string>(value || "");
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const debounceValue: string = useDebounce(querySearch, 500);
    const handleChange = (e: any) => {
      setQuerySearch(e?.target?.value);
      setIsInitial(false);
    };
    useEffect(() => {
      if (!isInitial) onTypeSearch(debounceValue);
    }, [debounceValue, isInitial]);

    return (
      <Input
        className={classNames(styles.inputSearch, `${!isMobile && "h-[40px]"}`)}
        placeholder={placeholder}
        value={querySearch}
        onChange={handleChange}
        maxLength={255}
        allowClear
        suffix={<Icon name="search" />}
        size={isMobile ? "middle" : "large"}
        {...props}
      />
    );
  }
);
