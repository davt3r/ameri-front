import { User } from "../../features/models/user";
import { ApiRepository } from "./api.repository";
export class UserRepository extends ApiRepository<User> {
  constructor(public url: string) {
    super(url);
  }

  async register(item: Partial<User>): Promise<User> {
    const response = await fetch(this.url + "user/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<User>;
  }

  async login(item: Partial<User>): Promise<User> {
    const response = await fetch(this.url + "user/login/", {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<User>;
  }
}
