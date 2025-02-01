import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  authed: boolean;
  accessToken: string | undefined;
  idToken: string | undefined;
  refreshToken: string | undefined;
  user: {
    ipaddr: string | undefined;
    email: string | undefined;
    username: string | undefined;
  };
}

interface JWTPayload {
  ipaddr: string;
  unique_name: string;
  given_name: string;
  family_name: string;
}

const initialState: AuthState = {
  authed: false,
  accessToken: undefined,
  idToken: undefined,
  refreshToken: undefined,
  user: {
    ipaddr: undefined,
    email: undefined,
    username: undefined,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<Omit<AuthState, "user">>) => {
      state.authed = true;
      state.accessToken = action.payload.accessToken;
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;

      const decoded = jwtDecode<JWTPayload>(action.payload.idToken as string);
      state.user = {
        ipaddr: decoded.ipaddr,
        email: decoded.unique_name,
        username: decoded.given_name + " " + decoded.family_name,
      };
    },
    deauthenticate: (state) => {
      state.authed = false;
      state.accessToken = undefined;
      state.idToken = undefined;
      state.refreshToken = undefined;

      state.user.ipaddr = undefined;
      state.user.email = undefined;
      state.user.username = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authenticate, deauthenticate } = authSlice.actions;

export default authSlice.reducer;
