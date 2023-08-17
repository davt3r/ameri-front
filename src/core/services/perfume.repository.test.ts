import { PerfumeRepository } from "./perfume.repository";

describe("PerfumeRepository", () => {
  let repository: PerfumeRepository;
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    repository = new PerfumeRepository("http://example.com/api/", "token");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("getAll should fetch and return perfumes", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest
        .fn()
        .mockResolvedValue({ items: [{ id: 1, name: "Perfume 1" }] }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.query();

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/perfume");
    expect(result.items).toEqual([{ id: 1, name: "Perfume 1" }]);
  });

  test("getAll should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    await expect(repository.query()).rejects.toThrow(
      "Error: 500. Internal Server Error"
    );

    expect(mockFetch).toHaveBeenCalledWith("http://example.com/api/perfume");
  });

  test("getPerfume should fetch and return a single perfume", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 1, name: "Perfume 1" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.getPerfume("64a1a7550c8b5d9f829318ee");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/64a1a7550c8b5d9f829318ee"
    );
    expect(result).toEqual({ id: 1, name: "Perfume 1" });
  });

  test("getPerfume should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: "Not Found",
    };

    mockFetch.mockResolvedValue(mockResponse);

    await expect(
      repository.getPerfume("64a1a7550c8b5d9f829318ee")
    ).rejects.toThrow("Error Http: 404. Not Found");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/64a1a7550c8b5d9f829318ee"
    );
  });

  test("deleteById should send a DELETE request", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
    };

    mockFetch.mockResolvedValue(mockResponse);

    await repository.deleteById("64a1a7550c8b5d9f829318ee");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/64a1a7550c8b5d9f829318ee",
      {
        headers: {
          Authorization: "Bearer token",
        },
        method: "DELETE",
      }
    );
  });

  test("deleteById should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    await expect(
      repository.deleteById("64a1a7550c8b5d9f829318ee")
    ).rejects.toThrow("Error Http: 500. Internal Server Error");

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/64a1a7550c8b5d9f829318ee",
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer token",
        },
      }
    );
  });
  test("addPerfume should send a POST request with the perfume data", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: 2, name: "Perfume 2" }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const perfumeData = {
      name: "New Perfume",
      brand: "Brand",
      price: 50,
    };

    const result = await repository.addPerfume(perfumeData);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/create",
      {
        body: JSON.stringify(perfumeData),
        headers: {
          Authorization: "Bearer token",
        },
        method: "POST",
      }
    );
    expect(result).toEqual({ id: 2, name: "Perfume 2" });
  });

  test("addPerfume should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const perfumeData = {
      name: "New Perfume",
      brand: "Brand",
      price: 50,
    };

    await expect(repository.addPerfume(perfumeData)).rejects.toThrow(
      "Error http: 500Internal Server Error"
    );

    expect(mockFetch).toHaveBeenCalled();
  });
  test("editPerfume should send a PATCH request with the updated perfume data", async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({
        id: "64a1a7550c8b5d9f829318ee",
        name: "Updated Perfume",
      }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const updatedPerfumeData = {
      id: "64a1a7550c8b5d9f829318ee",
      name: "Updated Perfume",
      brand: "Updated Brand",
      price: 100,
    };

    const result = await repository.editPerfume(updatedPerfumeData);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/edit/64a1a7550c8b5d9f829318ee",
      {
        method: "PATCH",
        body: JSON.stringify(updatedPerfumeData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
      }
    );
    expect(result).toEqual({
      id: "64a1a7550c8b5d9f829318ee",
      name: "Updated Perfume",
    });
  });

  test("editPerfume should throw an error when the response is not ok", async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    const updatedPerfumeData = {
      id: "64a1a7550c8b5d9f829318ee",
      name: "Updated Perfume",
      brand: "Updated Brand",
      price: 100,
    };

    await expect(repository.editPerfume(updatedPerfumeData)).rejects.toThrow(
      "response.json is not a function"
    );

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume/edit/64a1a7550c8b5d9f829318ee",
      {
        method: "PATCH",
        body: JSON.stringify(updatedPerfumeData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
      }
    );
  });
  test("filter should fetch and return filtered perfumes", async () => {
    const filter = "?category=floral";
    const mockPerfumes = [{ id: 1, name: "Perfume 1" }];
    const mockResponse = {
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(mockPerfumes),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const result = await repository.filter(filter);

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume" + filter
    );
    expect(result).toEqual(mockPerfumes);
  });

  test("filter should throw an error when the response is not ok", async () => {
    const filter = "?category=floral";
    const mockResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    mockFetch.mockResolvedValue(mockResponse);

    await expect(repository.filter(filter)).rejects.toThrow(
      "Error: 500. Internal Server Error"
    );

    expect(mockFetch).toHaveBeenCalledWith(
      "http://example.com/api/perfume" + filter
    );
  });
});
