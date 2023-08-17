import { Perfume } from "./perfume";

export type LoginData = {
  userName: string;
  password: string;
};

export type RegisterData = LoginData & {
  user: string;
};

export type PerfumesUser = RegisterData & {
  perfumes: Perfume[];
};

export type User = { id: string } & PerfumesUser;

export type SuccessLoginData = {
  token: string;
  user: User;
};

export type ApiResponse = {
  items: Perfume[];
};
