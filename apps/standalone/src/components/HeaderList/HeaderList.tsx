import { useToggle } from "@moose-desk/core";

import { FC, useEffect } from "react";

import { MDSearchInput } from "src/components/UI/MDSearchInput";

import { ScreenType } from "@moose-desk/repo";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import useScreenType from "src/hooks/useScreenType";

interface HeaderListProps {
  handleSearch: any;
  setShowTitle?: any;
}

export const HeaderList: FC<HeaderListProps> = ({
  handleSearch,
  setShowTitle,
  children,
}) => {
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const [screenType, screenWidth] = useScreenType();
  useEffect(() => {
    setShowTitle && setShowTitle(!isSearch);
  }, [isSearch]);
  return (
    <>
      {!isSearch ? (
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {screenType === ScreenType.SM ? (
              <MDButton
                icon={<Icon name="search" />}
                onClick={onToggleSearch}
              ></MDButton>
            ) : (
              <div className="sm:w-[300px] xl:w-[500px] ">
                <MDSearchInput onTypeSearch={handleSearch} />
              </div>
            )}

            {children}
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-2 items-center">
          <MDButton
            icon={<Icon name="search" />}
            onClick={onToggleSearch}
          ></MDButton>
          <div className="w-full">
            <MDSearchInput onTypeSearch={handleSearch} />
          </div>
        </div>
      )}
    </>
  );
};
