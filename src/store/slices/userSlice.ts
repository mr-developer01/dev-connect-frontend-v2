import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";
import { TuserData, userStateState } from "../../@types/storeTypes/sliceTypes";

const initialState: userStateState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TuserData | null>) => {
      state.user = action.payload;
    },

    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
