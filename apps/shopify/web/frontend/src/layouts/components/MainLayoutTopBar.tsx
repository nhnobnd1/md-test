import { useToggle } from "@moose-desk/core";
import { Button, Icon, Text, TopBar } from "@shopify/polaris";
import {
  CancelMajor,
  MaximizeMinor,
  MinimizeMinor,
  MobileHamburgerMajor,
} from "@shopify/polaris-icons";
import { useEffect, useState } from "react";
import Images from "src/assets/images";

import "src/assets/styles/layouts/components/main-layout-topbar.scss";
import useFullScreen from "src/store/useFullScreen";

interface MainLayoutTopBarProps {
  navigationToggle: () => void;
  setShowMainLayout: any;
}

const MainLayoutTopBar = ({
  navigationToggle,
  setShowMainLayout,
}: MainLayoutTopBarProps) => {
  const [expandedMenu, setExpendedMenu] = useState(true);

  const fullScreenState = useFullScreen((state) => state.fullScreen);
  const { state: fullScreen, toggle: toggleFullScreen } =
    useToggle(fullScreenState);

  const changeUpdateScreen = useFullScreen((state) => state.changeUpdateScreen);
  useEffect(() => {
    fullScreen ? changeUpdateScreen(true) : changeUpdateScreen(false);
  }, [fullScreen]);

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
        <div className="mr-10 flex items-center">
          <Button
            plain
            onClick={toggleFullScreen}
            icon={
              <Icon
                source={() => (
                  <>
                    {fullScreen ? (
                      <MinimizeMinor style={{ fontSize: 24 }} />
                    ) : (
                      <MaximizeMinor style={{ fontSize: 24 }} />
                    )}
                  </>
                )}
                color="base"
              />
            }
          />
        </div>
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
