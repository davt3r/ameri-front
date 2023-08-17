import { UserRepository } from "../../core/services/user.repository";
import { User } from "../models/user";
import {
  createPerfumeAsync,
  loadPerfumesAsync,
  loginUserAsync,
  registerUserAsync,
  deletePerfumeByIdAsync,
  editPerfumeAsync,
  loadFilteredPerfumesAsync,
} from "./thunks";
import { store } from "../../core/store/store";
import { PerfumeRepository } from "../../core/services/perfume.repository";
import { Perfume } from "../models/perfume";
import { ApiResponse } from "../models/back";

let perfumeRepo: PerfumeRepository;
let userRepo: UserRepository;
describe("Given the users slice reducer", () => {
  beforeEach(() => {
    perfumeRepo = {
      query: jest.fn().mockResolvedValue([]),
      addPerfume: jest.fn().mockResolvedValue({ id: 1, name: "New Perfume" }),
      delete: jest.fn(),
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as PerfumeRepository;
    userRepo = {
      url: "http://localhost:4242",
      register: jest.fn(),
      login: jest.fn(),
      query: jest.fn(),
      delete: jest.fn(),
      get: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as unknown as UserRepository;
  });
  describe("When it is instantiated", () => {
    const user = {} as Partial<User>;

    const mockPerfume: Perfume = {
      id: "1",
      name: "YSL",
      image: {
        url: "https://example.com/image.jpg",
        urlOriginal: "",
        mimetype: "",
        size: 0,
      },
      season: "winter",
      topNotes: "bergamote",
      baseNotes: "woodyNotes",
      lastNotes: "vetiver",
      owner: {
        id: "",
        userName: "",
        email: "",
        password: "",
        addPerfumes: [],
        isLogged: false,
        token: "",
      },
      description: "",
    };

    test("Then it should dispatch the deletePerfumeByIdAsync", async () => {
      const id = "1";
      const actionPayload = { id, repo: perfumeRepo };

      perfumeRepo.deleteById = jest.fn().mockResolvedValue(undefined);

      await store.dispatch(deletePerfumeByIdAsync(actionPayload));

      expect(perfumeRepo.deleteById).toHaveBeenCalled();
    });

    test("Then it should dispatch the createPerfumesAsync", async () => {
      await store.dispatch(
        createPerfumeAsync({ perfume: mockPerfume, repo: perfumeRepo })
      );

      expect(perfumeRepo.addPerfume).toHaveBeenCalled();
    });

    test("Then it should dispatch the registerUserAsync", async () => {
      await store.dispatch(registerUserAsync({ repo: userRepo, user }));
      expect(userRepo.register).toHaveBeenCalled();
    });

    test("Then it should dispatch the loginUserAsync", async () => {
      await store.dispatch(loginUserAsync({ repo: userRepo, user }));
      expect(userRepo.login).toHaveBeenCalled();
    });

    test("Then it should dispatch the getAllPerfumesAsync", async () => {
      await store.dispatch(loadPerfumesAsync(perfumeRepo));
      expect(perfumeRepo.query).toHaveBeenCalled();
    });

    test("Then it should dispatch the editPerfumeAsync", async () => {
      const data = { id: "1", name: "Updated Perfume" };
      const actionPayload = { data, repo: perfumeRepo };

      perfumeRepo.editPerfume = jest.fn().mockResolvedValue(data);

      await store.dispatch(editPerfumeAsync(actionPayload));

      expect(perfumeRepo.editPerfume).toHaveBeenCalled();
    });

    test("Then it should dispatch the loadFilteredPerfumesAsync", async () => {
      const filter = "spring";
      const response: ApiResponse = { items: [] };
      const actionPayload = { filter, repo: perfumeRepo };

      perfumeRepo.filter = jest.fn().mockResolvedValue(response);

      await store.dispatch(loadFilteredPerfumesAsync(actionPayload));

      expect(perfumeRepo.filter).toHaveBeenCalled();
    });
  });
});
