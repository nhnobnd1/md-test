import { Button, Icon, Text, TopBar } from "@shopify/polaris";
import { CancelMajor, MobileHamburgerMajor } from "@shopify/polaris-icons";
import { useState } from "react";
import Images from "src/assets/images";
import "src/assets/styles/layouts/components/main-layout-topbar.scss";

interface MainLayoutTopBarProps {
  navigationToggle: () => void;
  setShowMainLayout: any;
}

const MainLayoutTopBar = ({
  navigationToggle,
  setShowMainLayout,
}: MainLayoutTopBarProps) => {
  const [expandedMenu, setExpendedMenu] = useState(true);
  const SecondaryMenu = () => {
    return (
      <div className="Md-TopBar__Wrapper">
        <div className="Md-TopBar__Title">
          <div className="Md-Toggle__Navigation">
            <Button
              plain
              onClick={() => {
                setExpendedMenu(() => {
                  return !expandedMenu;
                });
                setShowMainLayout(!expandedMenu);
              }}
              icon={
                <Icon
                  source={() => (
                    <>
                      {expandedMenu ? (
                        <CancelMajor />
                      ) : (
                        <MobileHamburgerMajor />
                      )}
                    </>
                  )}
                  color="base"
                />
              }
            />
          </div>
          <img src={Images.Logo.LogoMooseDesk} alt="" width={175} />
          <div className="Md-TopBar__TextBrand">
            <Text as="p" variant="headingLg" fontWeight="semibold">
              {/* MooseDesk */}
            </Text>
          </div>
        </div>
        <div></div>
      </div>
    );
  };
  return (
    <TopBar
      showNavigationToggle
      onNavigationToggle={navigationToggle}
      secondaryMenu={<SecondaryMenu />}
    ></TopBar>
  );
};

export default MainLayoutTopBar;
