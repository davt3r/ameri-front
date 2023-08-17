import { UserRepository } from "./user.repository";

describe("UserRepository", () => {
  let repository: UserRepository;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    repository = new UserRepository("http://example.com/api/");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("register should send a POST request and return a user", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 1, username: "testuser" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const user = {
      username: "testuser",
      password: "password123",
    };

    const result = await repository.register(user);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/user/register",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }
    );
    expect(result).toEqual({ id: 1, username: "testuser" });
  });

  test("login should send a PATCH request and return a user", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 1, username: "testuser" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const user = {
      username: "testuser",
      password: "password123",
    };

    const result = await repository.login(user);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/user/login/",
      {
        method: "PATCH",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      }
    );
    expect(result).toEqual({ id: 1, username: "testuser" });
  });
});
