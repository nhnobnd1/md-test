import { reducers } from "src/redux/modules/rootReducer";

declare global {
  interface ModulesReducers {}
  type RootReducer = ExtractReducerState<typeof reducers> &
    ExtractReducerState<ModulesReducers>;

  type ExtractReducerState<R, K = keyof R> = {
    [P in K]: R[P] extends Function
      ? ExtractReducerState<ReturnType<R[P]>>
      : R[P] extends { [key: string]: any }
      ? ExtractReducerState<R[P]>
      : R[P];
  };
}
