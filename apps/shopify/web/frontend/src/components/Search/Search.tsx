import { useDebounce } from "@moose-desk/core/hooks/useDebounce";
import { Icon, TextField } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { memo, useEffect, useState } from "react";

interface ISearch {
  onTypeSearch: (keyword: string) => void;
  value?: string;
}
export const Search = memo(({ onTypeSearch, value }: ISearch) => {
  const [querySearch, setQuerySearch] = useState<string>(value || "");
  const debounceValue: string = useDebounce(querySearch, 500);
  const handleChange = (value: string) => {
    setQuerySearch(value);
  };
  const handleClear = () => {
    setQuerySearch("");
  };
  useEffect(() => {
    onTypeSearch(debounceValue);
  }, [debounceValue]);
  return (
    <TextField
      prefix={<Icon source={SearchMinor} />}
      placeholder="Search"
      label=""
      value={querySearch}
      onChange={handleChange}
      maxLength={255}
      clearButton
      onClearButtonClick={handleClear}
      autoComplete="off"
    />
  );
});
