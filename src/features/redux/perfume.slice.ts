import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user";
import {
  createPerfumeAsync,
  deletePerfumeByIdAsync,
  loadFilteredPerfumesAsync,
  loadPerfumesAsync,
} from "./thunks";
import { Perfume } from "../models/perfume";

export type UsersState = {
  users: User[];
  currentUser: Partial<User>;
  token?: string;
  perfumes: Perfume[];
};

const initialState: UsersState = {
  users: [] as User[],
  currentUser: {} as Partial<User>,
  token: localStorage.getItem("userToken") as string | undefined,
  perfumes: [] as Perfume[],
};

const perfumeSlice = createSlice({
  name: "perfumes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPerfumesAsync.fulfilled, (state, { payload }) => ({
      ...state,
      perfumes: payload.items,
    }));
    builder.addCase(
      loadFilteredPerfumesAsync.fulfilled,
      (state, { payload }) => ({
        ...state,
        perfumes: payload.items,
      })
    );
    builder.addCase(createPerfumeAsync.fulfilled, (state, { payload }) => ({
      ...state,
      perfumes: [...state.perfumes, payload],
    }));
    builder.addCase(deletePerfumeByIdAsync.fulfilled, (state, { payload }) => {
      return {
        ...state,
        perfumes: state.perfumes.filter((perfume) => perfume.id !== payload),
      };
    });
  },
});

export default perfumeSlice.reducer;
export const ac = perfumeSlice.actions;
