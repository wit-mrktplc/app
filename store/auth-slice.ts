import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  authed: boolean;
  accessToken: string | undefined;
  idToken: string | undefined;
  refreshToken: string | undefined;
}

const initialState: AuthState = {
  authed: false,
  accessToken: undefined,
  idToken: undefined,
  refreshToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<Omit<AuthState, "token">>) => {
      state.authed = true;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
    },
    deauthenticate: (state) => {
      state.authed = false;
      state.accessToken = undefined;
      state.idToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, deauthenticate } = authSlice.actions;

export default authSlice.reducer;
