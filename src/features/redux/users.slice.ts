import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { loginUserAsync, registerUserAsync } from "./thunks";

export type UsersState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string;
};

export const initialState: UsersState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem("userToken") as string | undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    logoutUser: (state) => ({
      ...state,
      token: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      users: [...state.users, payload],
    }));
    builder.addCase(loginUserAsync.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }));
  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
