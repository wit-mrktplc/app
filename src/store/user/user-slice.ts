import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string | undefined;
  email: string | undefined;
  image: string | undefined;
}

const initialState: UserState = {
  name: undefined,
  email: undefined,
  image: undefined,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initialize: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    flush: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.image = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialize, flush } = userSlice.actions;
