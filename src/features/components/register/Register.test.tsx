import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { store } from "../../../core/store/store";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe("Register Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
  });

  test("displays the register form", () => {
    const registerForm = screen.getByRole("heading", { name: "Register" });

    expect(registerForm).toBeInTheDocument();
  });
});
