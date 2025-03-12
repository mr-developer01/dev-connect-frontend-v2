import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";

export interface apiResponseState {
  success: string
  error: string
}

const initialState: apiResponseState = {
    success: "I am success state!!",
    error: "I am error state!!"
};

export const apiResponseSlice = createSlice({
  name: "apiResponse",
  initialState,
  reducers: {
    setSuccessState: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },

    setErrorState: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  },
});

export const { setSuccessState, setErrorState } = apiResponseSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSuccess = (state: RootState) => state.apiResponse.success;
export const selectError = (state: RootState) => state.apiResponse.error;

export default apiResponseSlice.reducer;
