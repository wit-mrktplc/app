import { configureStore } from "@reduxjs/toolkit";

// import without brackets here, because we are importing the default export, the reducer
import { authSlice } from "./auth/auth-slice";
import { notificationSlice } from "./notification/notification-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
