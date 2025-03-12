import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";

export interface toggleState {
  modal: boolean;
  snack: boolean
}

const initialState: toggleState = {
  modal: false,
  snack: false
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleModel: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },

    toggleSnack: (state, action: PayloadAction<boolean>) => {
      state.snack = action.payload;
    },
  },
});

export const { toggleModel, toggleSnack } = toggleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.toggle.modal;
export const selectSnack = (state: RootState) => state.toggle.snack;

export default toggleSlice.reducer;
