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
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const debounceValue: string = useDebounce(querySearch, 500);
  const handleChange = (value: string) => {
    setQuerySearch(value);
    setIsInitial(false);
  };
  const handleClear = () => {
    setQuerySearch("");
  };
  useEffect(() => {
    if (!isInitial) onTypeSearch(debounceValue);
  }, [debounceValue, isInitial]);
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
