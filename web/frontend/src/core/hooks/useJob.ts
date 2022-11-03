import { useCallback, useMemo, useRef, useState } from "react";
import { Observable, Subject, Subscription } from "rxjs";
import { useMount } from "src/core/hooks/useMount";
import { useLoading } from "src/core/loading";
import JobState from "src/core/models/JobState";

type Fn<Result = any> = (...args: any) => Observable<Result>;
interface UseJobOptions {
  showLoading?: boolean;
}

interface UseJobResult<T extends Fn> {
  run: (...args: Parameters<T>) => void;
  cancel: () => void;
  state: JobState;
  processing: boolean;
  result?: ReturnType<T> extends Observable<infer R> ? R : any;
  error: any;
}

export function useJob<T extends Fn>(
  fn: T,
  options?: UseJobOptions
): UseJobResult<T> {
  const subject = useRef(new Subject<Observable<any>>());
  const [jobSubscription, setJobSubscription] = useState<Subscription>();

  const { startLoading, stopLoading } = useLoading();

  const [state, setState] = useState<JobState>(JobState.Standing);
  const [result, setResult] =
    useState<ReturnType<T> extends Observable<infer R> ? R : any>();
  const [error, setError] = useState<any>();

  const processing = useMemo(() => state === JobState.Processing, [state]);

  const run = useCallback(
    (...args: Parameters<T>) => {
      setState(JobState.Processing);
      if (options?.showLoading) {
        startLoading();
      }

      subject.current.next(fn(...(args as any[])));
    },
    [fn]
  );

  const cancel = useCallback(() => {
    jobSubscription?.unsubscribe();
    setState(JobState.Standing);

    if (options?.showLoading) {
      stopLoading();
    }
  }, [jobSubscription]);

  useMount(() => {
    if (subject.current.closed) {
      subject.current = new Subject();
    }

    subject.current.subscribe({
      next: (observable) => {
        setJobSubscription(
          observable.subscribe({
            next: setResult,
            complete: () => {
              setState(JobState.Success);
              if (options?.showLoading) {
                stopLoading();
              }
            },
            error: (error) => {
              setState(JobState.Failed);
              setError(error);

              if (options?.showLoading) {
                stopLoading();
              }
            },
          })
        );
      },
    });

    return () => {
      if (options?.showLoading) {
        stopLoading();
      }
      subject.current.unsubscribe();
    };
  });

  return {
    run,
    cancel,
    state,
    processing,
    result,
    error,
  };
}
