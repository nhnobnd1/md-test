import { SignInCallbackResponse } from "@moose-desk/repo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  signInCallback: SignInCallbackResponse;
} = {
  signInCallback: {
    refKey: "",
    accessType: "",
    name: "",
    oauthStatus: "",
    supportEmail: "",
    type: null,
  },
};

export const channelEmailSlice = createSlice({
  name: "channelEmail",
  initialState,
  reducers: {
    setSignInCallback(state, action: PayloadAction<SignInCallbackResponse>) {
      state.signInCallback = action.payload;
    },
  },
});

export const { setSignInCallback } = channelEmailSlice.actions;

export default channelEmailSlice.reducer;
