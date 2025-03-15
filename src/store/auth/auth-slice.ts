import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { initialize } from "../user/user-slice";

export interface AuthState {
  authed: boolean;
  token: string | undefined;
}

const initialState: AuthState = {
  authed: false,
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<AuthState>) => {
      state.authed = true;
      state.token = action.payload.token;
    },
    deauthenticate: (state) => {
      state.authed = false;
      state.token = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, deauthenticate } = authSlice.actions;
