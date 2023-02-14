import { useDidUpdate } from "@moose-desk/core";
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

  useEffect(() => {
    if (key && !listCountDown[key]) {
      setListCountDown((value) => ({
        ...value,
        [key]: initValue,
      }));
    }
  }, [key]);

  useDidUpdate(() => {
    Object.keys(listCountDown).forEach((key) => {
      if (listCountDown[key] === 0) {
        clearCountDown(key);
      }
    });
  }, [listCountDown]);

  const setUpTimer = useCallback(
    (key) => {
      const obj: any = {};
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
    },
    [key, timerObj]
  );

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

  const initCountdown = useCallback(
    (key: string) => {
      setListCountDown((value) => ({
        ...value,
        [key]: initValue,
      }));
      setUpTimer(key);
    },
    [initValue]
  );

  return {
    state: listCountDown[key],
    clearCountDown,
    initCountdown,
  };
}
