import { useToggle } from "@moose-desk/core";
import { useCallback, useEffect, useState } from "react";

interface CountDown {
  initValue: number;
  isGlobal?: boolean;
}
export function useCountDown({ initValue, isGlobal = false }: CountDown) {
  const [countDownValue, setCountDownValue] = useState<number>(initValue);
  const {
    state: process,
    on: startCountDown,
    off: stopCountDown,
  } = useToggle(false);
  let intervalId: any;

  useEffect(() => {
    // eslint-disable-next-line no-undef-init
    if (process) {
      intervalId = setInterval(() => {
        setCountDownValue((value) => {
          return value >= 1 ? value - 1 : value;
        });
        if (countDownValue === 0) {
          setCountDownValue(initValue);
          clearCountDown();
        }
      }, 1000);
    } else {
      clearCountDown();
    }
    return () => clearInterval(intervalId);
  }, [countDownValue, process]);

  const clearCountDown = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  return {
    state: countDownValue,
    clearCountDown,
    startCountDown,
    stopCountDown,
  };
}
