import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Input, InputProps } from "antd";
import React, { useEffect, useState } from "react";
import Icon from "src/components/UI/Icon";
import useViewport from "src/hooks/useViewport";
import styles from "./style.module.scss";
interface IMDSearchInput extends InputProps {
  placeholder?: string;
  onTypeSearch: (keyword: string) => void;
}
export const MDSearchInput = React.memo(
  ({ placeholder = "Search", onTypeSearch, ...props }: IMDSearchInput) => {
    const { isMobile } = useViewport();
    const [querySearch, setQuerySearch] = useState<string>("");
    const debounceValue: string = useDebounce(querySearch, 300);
    const handleChange = (e: any) => {
      setQuerySearch(e?.target?.value);
    };
    useEffect(() => {
      onTypeSearch(debounceValue);
    }, [debounceValue]);

    return (
      <Input
        className={styles.inputSearch}
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
