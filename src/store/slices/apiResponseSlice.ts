import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";

export interface apiResponseState {
  resMessage: string;
  error: boolean;
}

const initialState: apiResponseState = {
  resMessage: "I am success state!!",
  error: true,
};

export const apiResponseSlice = createSlice({
  name: "apiResponse",
  initialState,
  reducers: {
    setResMessage: (state, action: PayloadAction<string>) => {
      state.resMessage = action.payload;
    },

    setErrorState: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const { setResMessage, setErrorState } = apiResponseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSuccess = (state: RootState) => state.apiResponse.resMessage;
export const selectError = (state: RootState) => state.apiResponse.error;

export default apiResponseSlice.reducer;
