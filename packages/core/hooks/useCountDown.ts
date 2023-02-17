import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StorageManager } from "../utilities";
import { useDidUpdate } from "./useDidUpdate";

export interface CountDown {
  initValue: number;
  key: string;
}

export interface UseCountDown {
  state: number;
  clearCountDown: (key: string) => void;
  initCountdown: (key: string) => void;
  checkTimerProcess: boolean;
}
export function useCountDown({ initValue, key }: CountDown): UseCountDown {
  const [listCountDown, setListCountDown] = useState<{
    [props: string]: number;
  }>({});
  const [timerObj, setTimerObj] = useState<{
    [props: string]: any;
  }>({});

  const initCountdown = useCallback(
    (key: string, time?: number) => {
      setListCountDown((value) => ({
        ...value,
        [key]: time || initValue,
      }));
    },
    [initValue]
  );

  useEffect(() => {
    if (key && !listCountDown[key]) {
      const countDownJson = StorageManager.getToken("countDown");
      const leavingDateJson = StorageManager.getToken("leavingDate");
      if (countDownJson && leavingDateJson) {
        const countDownProcess = JSON.parse(countDownJson);
        const leavingDate = JSON.parse(leavingDateJson);
        if (countDownProcess[key]) {
          const time = leavingDate;
          const now = dayjs().unix();

          const listProcess = {
            ...countDownProcess,
          };

          const listCount: any = {};
          Object.keys(listProcess).forEach((itemKey) => {
            const allTimeProcess: number =
              countDownProcess[itemKey] - (now - time);
            if (allTimeProcess < initValue && allTimeProcess > 0) {
              listCount[itemKey] = allTimeProcess;
            } else {
              clearCountDown(itemKey);
            }
          });

          setListCountDown((value) => ({
            ...value,
            ...listCount,
          }));
        }
      }
    }
  }, [key]);

  useDidUpdate(() => {
    StorageManager.setToken("countDown", JSON.stringify({ ...listCountDown }));
    StorageManager.setToken("leavingDate", JSON.stringify(dayjs().unix()));

    Object.keys(listCountDown).forEach((key) => {
      if (!Object.keys(timerObj).includes(key)) {
        setUpTimer(key);
      }
      if (listCountDown[key] === 0) {
        clearCountDown(key);
      }
    });
  }, [listCountDown]);

  const setUpTimer = useCallback(
    (key: string) => {
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
          return { ...value };
        });
        setListCountDown((value) => {
          delete value[key];
          return value;
        });
      }
    },
    [timerObj]
  );

  const checkTimerProcess = useMemo(() => {
    return Object.keys(timerObj).includes(key);
  }, [timerObj, key]);

  return {
    state: listCountDown[key],
    clearCountDown,
    initCountdown,
    checkTimerProcess,
  };
}
