import { ScreenType } from "@moose-desk/repo/global/Global";
import { useEffect } from "react";
import useScreenType from "src/hooks/useScreenType";
import useFullScreen from "src/store/useFullScreen";

export default function usePreventNav() {
  const changeShowNav = useFullScreen((state) => state.changeShowNav);
  const screenType = useScreenType();

  useEffect(() => {
    if (screenType === ScreenType.SM) {
      return;
    }
    changeShowNav(false);

    return () => {
      changeShowNav(true);
    };
  }, [screenType]);
}
