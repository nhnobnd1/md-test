import { useEffect, useState } from "react";

type Breakpoints = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

const defaultBreakpoints: Breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1600px",
};

type ScreenType = "sm" | "md" | "lg" | "xl" | "xxl";

function useScreenType(): ScreenType {
  const [screenType, setScreenType] = useState<ScreenType>("sm");

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
