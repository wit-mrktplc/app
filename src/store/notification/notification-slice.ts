import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface NotificationState {
  count: number;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: number;
}

const initialState: NotificationState = {
  count: 0,
  notifications: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    prepend: (state, action: PayloadAction<Notification>) => {
      // Validate the notification before adding it and verify it has been added before incrementing the count
      state.count += 1;
      // Add to the beginning of the array
      state.notifications.unshift(action.payload);
    },
    removeById: (state, action: PayloadAction<string>) => {
      // Validate the notification before removing it and verify it has been removed before decrementing the count
      state.count -= 1;
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { prepend, removeById } = notificationSlice.actions;
