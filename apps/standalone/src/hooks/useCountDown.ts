import { useDidUpdate, useToggle } from "@moose-desk/core";
import { useCallback, useEffect, useState } from "react";

interface CountDown {
  initValue: number;
  key: string;
}
export function useCountDown({ initValue, key }: CountDown) {
  const [listCountDown, setListCountDown] = useState<{
    [props: string]: number;
  }>({});
  const [timerObj, setTimerObj] = useState<{
    [props: string]: any;
  }>({});
  const {
    state: process,
    on: startCountDown,
    off: stopCountDown,
  } = useToggle(false);

  useEffect(() => {
    if (key && !listCountDown[key]) {
      setListCountDown((value) => ({
        ...value,
        [key]: initValue,
      }));
    }
  }, [key, process]);

  useEffect(() => {
    const obj: any = {};
    if (process) {
      if (!timerObj[key]) {
        obj[key] = setInterval(() => {
          setListCountDown((value) => ({
            ...value,
            [key]: value[key] - 1,
          }));
        }, 1000);
        setTimerObj((value) => ({
          ...value,
          ...obj,
        }));
      }
    } else {
      clearCountDown(key);
    }
  }, [key, process, stopCountDown]);

  useDidUpdate(() => {
    Object.keys(listCountDown).forEach((key) => {
      if (listCountDown[key] === 0) {
        clearCountDown(key);
      }
    });
  }, [listCountDown]);

  const clearCountDown = useCallback(
    (key: string) => {
      if (timerObj[key]) {
        const idInterval = timerObj[key];
        clearInterval(idInterval);
        setTimerObj((value) => {
          delete value[key];
          return value;
        });
        setListCountDown((value) => {
          delete value[key];
          return value;
        });
      }
    },
    [timerObj]
  );

  return {
    state: listCountDown[key],
    clearCountDown,
    startCountDown,
    stopCountDown,
  };
}
