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
  lg: "1024px",
  xl: "1280px",
  xxl: "1600px",
};

type ScreenType = "sm" | "md" | "lg" | "xl" | "xxl";

function useScreenType(): [ScreenType, number] {
  const [screenType, setScreenType] = useState<ScreenType>("sm");
  const [screenWidth, setScreenWidth] = useState<number>(0);

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
      setScreenWidth(currentWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // set initial screen type value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return [screenType, screenWidth];
}

export default useScreenType;
