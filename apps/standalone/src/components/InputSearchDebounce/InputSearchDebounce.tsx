import React, { useState } from "react";
import { Input } from "antd";
import debounce from "lodash";

const { Search } = Input;
const DebouncedSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce((value) => {
    console.log(value);
    // do something with the search term
  }, 500);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <Search
      placeholder="Search"
      allowClear
      enterButton
      value={searchTerm}
      onChange={handleChange}
    />
  );
};