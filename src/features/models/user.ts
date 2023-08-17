import { Perfume } from "./perfume";

export type User = {
  id: string;
  userName: string;
  email: string;
  password: string;
  addPerfumes: Perfume[];
  isLogged: boolean;
  token: string;
};

export type UserStructure = { id: string } & User;

export type UserServerResponse = {
  results: UserStructure[];
};
