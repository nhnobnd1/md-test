import { Observable } from "rxjs";
import JobState from "../models/JobState";
declare type Fn<Result = any> = (...args: any) => Observable<Result>;
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
export declare function useJob<T extends Fn>(fn: T, options?: UseJobOptions): UseJobResult<T>;
export {};
