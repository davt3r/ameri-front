import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../../core/store/store";
import List from "./List";

jest.mock("../../hooks/use.perfumes", () => ({
  usePerfumes: jest.fn().mockReturnValue({
    handleLoadPerfumes: jest.fn(),
    perfumes: [
      {
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
      },
    ],
  }),
}));

describe("List Component", () => {
  test("renders list of perfumes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <List />
        </MemoryRouter>
      </Provider>
    );

    const perfumeItems = screen.getAllByRole("listitem");
    expect(perfumeItems).toHaveLength(1);
  });

  test("renders create button when user is logged in", () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue("token"),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <List />
        </MemoryRouter>
      </Provider>
    );

    const createButton = screen.getByRole("button", { name: "Create" });
    expect(createButton).toBeTruthy();
  });
});
