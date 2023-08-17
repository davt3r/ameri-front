import { Perfume } from "../../features/models/perfume";
import { ApiRepository } from "./api.repository";
import { ApiResponse } from "../../features/models/back";

export class PerfumeRepository extends ApiRepository<Perfume> {
  constructor(public url: string, public token: string) {
    super(url);
    this.url += "perfume";
  }

  async query(): Promise<ApiResponse> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = (await response.json()) as Promise<ApiResponse>;
    return await data;
  }
  async getPerfume(id: Perfume["id"]): Promise<Perfume> {
    const url = this.url + "/" + id;
    const resp = await fetch(url);
    if (!resp.ok)
      throw new Error("Error Http: " + resp.status + ". " + resp.statusText);
    const data = (await resp.json()) as Perfume;
    return data;
  }

  async deleteById(id: Perfume["id"]) {
    const url = this.url + "/" + id;
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!resp.ok)
      throw new Error("Error Http: " + resp.status + ". " + resp.statusText);
  }

  async addPerfume(infoPerfume: Partial<Perfume>): Promise<Perfume> {
    const url = this.url + "/create";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(infoPerfume),
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const perfumeData = (await resp.json()) as Perfume;

    return perfumeData;
  }

  async editPerfume(data: Partial<Perfume>): Promise<Perfume> {
    const response = await fetch(this.url + "/edit/" + data.id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response.json() as Promise<Perfume>;
  }
  async filter(filter: string): Promise<ApiResponse> {
    const response = await fetch(this.url + filter);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const data = response.json() as Promise<ApiResponse>;
    return data;
  }
}
