import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserRepository } from "../../core/services/user.repository";
import { User } from "../models/user";
import { Perfume } from "../models/perfume";
import { PerfumeRepository } from "../../core/services/perfume.repository";
import { ApiResponse } from "../models/back";

export const loadPerfumesAsync = createAsyncThunk(
  "perfumes/load",
  async (repo: PerfumeRepository) => {
    const answer = await repo.query();
    return answer;
  }
);

export const registerUserAsync = createAsyncThunk<
  User,
  { repo: UserRepository; user: Partial<User> }
>("users/register", async ({ repo, user }) => {
  return await repo.register(user);
});

export const loginUserAsync = createAsyncThunk<
  Partial<User>,
  { repo: UserRepository; user: Partial<User> }
>("users/login", async ({ repo, user }) => {
  const result = await repo.login(user);
  return result;
});

export const createPerfumeAsync = createAsyncThunk<
  Perfume,
  { perfume: Perfume; repo: PerfumeRepository }
>("perfumes/createPerfume", async ({ perfume, repo }) => {
  const userAddPerfume = await repo.addPerfume(perfume);

  return userAddPerfume;
});

export const deletePerfumeByIdAsync = createAsyncThunk<
  string,
  { id: string; repo: PerfumeRepository },
  { rejectValue: string }
>("perfumes/deletePerfumeById", async ({ id, repo }) => {
  await repo.deleteById(id);
  return id;
});

export const editPerfumeAsync = createAsyncThunk<
  Perfume,
  { repo: PerfumeRepository; data: Partial<Perfume> }
>("perfumes/edit", async ({ repo, data }) => {
  return await repo.editPerfume(data);
});

export const loadFilteredPerfumesAsync = createAsyncThunk<
  ApiResponse,
  { repo: PerfumeRepository; filter: string }
>("perfumes/loadFilter", async ({ repo, filter }) => {
  const response = await repo.filter(filter);
  return response;
});
