import { useEffect, useState } from "react";

type Breakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

const defaultBreakpoints: Breakpoints = {
  xs: "320px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px",
};

type ScreenType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

function useScreenType(): ScreenType {
  const [screenType, setScreenType] = useState<ScreenType>("xs");

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentScreenType = Object.keys(defaultBreakpoints)
        .reverse()
        .find((key) => {
          return (
            currentWidth >= parseInt(defaultBreakpoints[key as ScreenType])
          );
        }) as ScreenType;
      setScreenType(currentScreenType);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial screen type value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenType;
}

export default useScreenType;
