import { configureStore } from "@reduxjs/toolkit";
import SettingChannelStore from "src/modules/settingChannel/redux";

export const store = configureStore({
  reducer: {
    ...SettingChannelStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
