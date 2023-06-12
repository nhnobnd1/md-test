import { useToggle } from "@moose-desk/core";
import { ScreenType } from "@moose-desk/repo/global/Global";
import { Button } from "@shopify/polaris";
import { MobileBackArrowMajor, SearchMinor } from "@shopify/polaris-icons";
import { FC, useEffect } from "react";
import { Search } from "src/components/Search/Search";
import useScreenType from "src/hooks/useScreenType";
import styles from "./styles.module.scss";

interface HeaderListTicketProps {
  handleSearch: any;
  handleAddNew: any;
  setShowTitle: any;
}

export const HeaderListTicket: FC<HeaderListTicketProps> = ({
  handleSearch,
  handleAddNew,
  setShowTitle,
  children,
}) => {
  const { state: isSearch, toggle: onToggleSearch } = useToggle(false);
  const [screenType, screenWidth] = useScreenType();
  useEffect(() => {
    setShowTitle(!isSearch);
  }, [isSearch]);
  return (
    <>
      {!isSearch ? (
        <div className={styles.topPage}>
          {/* <Text variant="headingLg" as="h1">
            Tickets
          </Text> */}
          <div className="flex gap-2">
            {screenType === ScreenType.SM ? (
              <Button icon={SearchMinor} onClick={onToggleSearch}></Button>
            ) : (
              <div className="lg:w-[300px] xl:w-[500px] ">
                <Search onTypeSearch={handleSearch} />
              </div>
            )}

            {children}
            <Button primary onClick={handleAddNew}>
              Add new
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex w-full gap-2">
          <Button icon={MobileBackArrowMajor} onClick={onToggleSearch}></Button>
          <div className="w-full">
            <Search onTypeSearch={handleSearch} />
          </div>
        </div>
      )}
    </>
  );
};
