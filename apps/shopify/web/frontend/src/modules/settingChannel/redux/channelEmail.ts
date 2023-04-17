import { SignInCallbackResponse } from "@moose-desk/repo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignInCallBack extends SignInCallbackResponse {
  callbackName: "gmail" | "microsoft" | undefined;
  id: string;
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
    id: "",
  },
};

export const channelEmailSlice = createSlice({
  name: "channelEmail",
  initialState,
  reducers: {
    setSignInCallback(state, action: PayloadAction<SignInCallBack>) {
      state.signInCallback = action.payload;
    },
  },
});

export const { setSignInCallback } = channelEmailSlice.actions;

export default channelEmailSlice.reducer;
