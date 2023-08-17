import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./login";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../../../core/store/store";
import { useUsers } from "../../hooks/use.users";

jest.mock("../../hooks/use.users", () => ({
  useUsers: jest.fn().mockReturnValue({
    handleLoginUser: jest.fn(),
  }),
}));

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const loginForm = screen.getByText("Login");
    expect(loginForm).toBeInTheDocument();
  });

  test("handles form submission successfully", async () => {
    const handleLoginUser = jest.fn().mockResolvedValue(true);
    (useUsers as jest.Mock).mockReturnValue({ handleLoginUser });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "SEND" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLoginUser).toHaveBeenCalledWith({
        user: "testuser",
        password: "testpassword",
      });
      expect(screen.queryByText("Invalid username or password.")).toBeNull();
    });
  });

  test("handles form submission with authentication error", async () => {
    const handleLoginUser = jest.fn().mockResolvedValue(false);
    (useUsers as jest.Mock).mockReturnValue({ handleLoginUser });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "SEND" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleLoginUser).toHaveBeenCalledWith({
        user: "testuser",
        password: "testpassword",
      });
      expect(
        screen.getByText("Invalid username or password.")
      ).toBeInTheDocument();
    });
  });

  test("displays error message on empty form submission", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    const submitButton = screen.getByRole("button", { name: "SEND" });

    fireEvent.click(submitButton);

    const errorMessage = screen.getByText("Invalid username or password.");
    expect(errorMessage).toBeInTheDocument();
  });
});
