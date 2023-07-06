import { useToggle, useUser } from "@moose-desk/core";
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
import useToggleGlobal from "src/hooks/useToggleGlobal";
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
  const user = useUser();
  const fullScreenState = useFullScreen((state) => state.fullScreen);
  const { state: fullScreen, toggle: toggleFullScreen } =
    useToggle(fullScreenState);

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
            <img src={Images.Logo.LogoMooseDesk} alt="" width={175} />
          </div>
          <div className="mr-10 flex items-center w-full gap-2">
            <div className="md:flex hidden max-w-[500px]  max-h-[56px] justify-end overflow-x-scroll">
              <Text truncate as="span" variant="headingSm">
                {user?.subdomain} qwe qwe qweqw qwe qweq w qw qe qwe qwe q qwe
                qwe qw qw e qwe qe qwe qwe jqw jeiqjw eiqwje iqji je
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

export default MainLayoutTopBar;
