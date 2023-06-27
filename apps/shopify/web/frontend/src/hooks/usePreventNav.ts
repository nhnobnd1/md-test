import { ScreenType } from "@moose-desk/repo";
import { useEffect } from "react";
import useScreenType from "src/hooks/useScreenType";
import useFullScreen from "src/store/useFullScreen";

export default function usePreventNav(screen = 5000) {
  const changeShowNav = useFullScreen((state) => state.changeShowNav);
  const [screenType, screenWidth] = useScreenType();

  useEffect(() => {
    // default  using this hook will prevent nav, if you want to show nav, you can pass screen param
    if (screenWidth >= screen) {
      changeShowNav(true);
      return;
    }

    if (screenType === ScreenType.SM) {
      return;
    }
    changeShowNav(false);

    return () => {
      changeShowNav(true);
    };
  }, [screenType, screenWidth]);
}
