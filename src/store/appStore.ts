import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./slices/toggleSlice";
import apiResponseReducer from "./slices/apiResponseSlice"
import userReducer from "./slices/userSlice"
// ...

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    apiResponse: apiResponseReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
