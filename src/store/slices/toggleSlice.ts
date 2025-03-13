import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";

type TAnchor = {
  right: boolean
}

export interface toggleState {
  modal: boolean;
  snack: boolean
  anchor: TAnchor
}

const initialState: toggleState = {
  modal: false,
  snack: false,
  anchor: {
    right: false,
  }
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

    setAnchor : (state, action: PayloadAction<TAnchor>) => {
      state.anchor = action.payload
    }
  },
});

export const { toggleModel, toggleSnack, setAnchor } = toggleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectModal = (state: RootState) => state.toggle.modal;
export const selectSnack = (state: RootState) => state.toggle.snack;
export const selectAnchor = (state: RootState) => state.toggle.anchor;

export default toggleSlice.reducer;
