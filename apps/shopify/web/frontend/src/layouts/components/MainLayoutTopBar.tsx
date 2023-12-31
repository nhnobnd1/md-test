import { MediaScreen, useNavigate, useToggle } from "@moose-desk/core";
import { Button, Icon, Text, TopBar } from "@shopify/polaris";
import {
  CancelMajor,
  MaximizeMinor,
  MinimizeMinor,
  MobileHamburgerMajor,
} from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import logo from "src/assets/images/logo/logoBase.svg";

import "src/assets/styles/layouts/components/main-layout-topbar.scss";
import useScreenType from "src/hooks/useScreenType";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import useFullScreen from "src/store/useFullScreen";
import useUser from "src/store/useUser";

interface MainLayoutTopBarProps {
  navigationToggle: () => void;
  setShowMainLayout: any;
}

const MainLayoutTopBar = ({
  navigationToggle,
  setShowMainLayout,
}: MainLayoutTopBarProps) => {
  const navigate = useNavigate();
  const [screenType, screenWidth] = useScreenType();
  const isMobile = Boolean(screenWidth < MediaScreen.MD);
  const [expandedMenu, setExpendedMenu] = useState(true);
  // const user = useUser();
  const fullScreenState = useFullScreen((state) => state.fullScreen);
  const { state: fullScreen, toggle: toggleFullScreen } =
    useToggle(fullScreenState);
  const user = useUser((state) => state.user);

  const changeUpdateScreen = useFullScreen((state) => state.changeUpdateScreen);
  useEffect(() => {
    fullScreen ? changeUpdateScreen(true) : changeUpdateScreen(false);
  }, [fullScreen]);
  const { visible } = useToggleGlobal();
  useEffect(() => {
    setExpendedMenu(!visible);
  }, [visible]);

  const SecondaryMenu = () => {
    return (
      <div className="Md-TopBar__Wrapper">
        <div className="flex">
          <div className="Md-TopBar__Title">
            <div className="Md-Toggle__Navigation ">
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
            <img
              src={logo}
              alt="logo"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/dashboard")}
              width={isMobile ? 135 : 150}
              height={35}
              loading="eager"
            />
          </div>
          <div className="mr-10 flex items-center w-full gap-2">
            <div className="md:flex hidden max-w-[500px]  max-h-[56px] justify-end overflow-x-auto">
              <Text truncate as="span" variant="headingSm">
                {user?.subdomain}
              </Text>
              <span>&nbsp;/&nbsp;</span>
              <Text truncate as="span" variant="headingSm">
                {user?.email}
              </Text>
            </div>
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

export default React.memo(MainLayoutTopBar);
