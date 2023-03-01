import { SignInCallbackResponse } from "@moose-desk/repo";
import { createSlice } from "@reduxjs/toolkit";

export interface SignInCallBack extends SignInCallbackResponse {
  callbackName: "gmail" | "microsoft" | undefined;
}

export const initialState: {
  signInCallback: SignInCallBack;
  externalMailConnection: boolean;
} = {
  signInCallback: {
    refKey: "",
    accessType: "",
    name: "",
    oauthStatus: "",
    supportEmail: "",
    type: null,
    callbackName: undefined,
  },
  externalMailConnection: false,
};

export const channelEmailSlice = createSlice({
  name: "channelEmail",
  initialState,
  reducers: {
    setSignInCallback(state, { type, payload }) {
      state.signInCallback = payload;
    },
    setExternalMailConnection(
      state,
      action: { type: string; payload: boolean }
    ) {
      state.externalMailConnection = action.payload;
    },
  },
});

export const { setSignInCallback, setExternalMailConnection } =
  channelEmailSlice.actions;

export default channelEmailSlice.reducer;
