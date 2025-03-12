import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../appStore";

type TuserData = {
    _id: string
    name: string
    email: string
}

export interface userStateState {
  user: TuserData | null
}

const initialState: userStateState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<TuserData>) => {
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
