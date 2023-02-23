import { SignInCallbackResponse } from "@moose-desk/repo";
import { createSlice } from "@reduxjs/toolkit";

export interface SignInCallBack extends SignInCallbackResponse {
  callbackName: "gmail" | "microsoft" | undefined;
}

export const initialState: {
  signInCallback: SignInCallBack;
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
};

export const channelEmailSlice = createSlice({
  name: "channelEmail",
  initialState,
  reducers: {
    setSignInCallback(state, { type, payload }) {
      state.signInCallback = payload;
    },
  },
});

export const { setSignInCallback } = channelEmailSlice.actions;

export default channelEmailSlice.reducer;
