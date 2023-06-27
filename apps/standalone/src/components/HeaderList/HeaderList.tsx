import { useToggle } from "@moose-desk/core";

import { FC } from "react";

import { MDSearchInput } from "src/components/UI/MDSearchInput";

import { ScreenType } from "@moose-desk/repo";
import { Button } from "antd";
import useScreenType from "src/hooks/useScreenType";

interface HeaderListProps {
  handleSearch: any;
}

export const HeaderList: FC<HeaderListProps> = ({
  handleSearch,

  children,
}) => {
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const [screenType, screenWidth] = useScreenType();

  return (
    <>
      {!isSearch ? (
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {screenType === ScreenType.SM ? (
              <Button onClick={onToggleSearch}>Search</Button>
            ) : (
              <div className="lg:w-[300px] xl:w-[500px] ">
                <MDSearchInput onTypeSearch={handleSearch} />
              </div>
            )}

            {children}
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <Button onClick={onToggleSearch}>Search</Button>
          <div className="w-full">
            <MDSearchInput onTypeSearch={handleSearch} />
          </div>
        </div>
      )}
    </>
  );
};
