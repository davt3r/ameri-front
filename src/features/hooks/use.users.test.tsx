import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { loginUserAsync, registerUserAsync } from "../redux/thunks";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { useUsers } from "./use.users";
import { store } from "../../core/store/store";
import { ac } from "../redux/users.slice";

const mockUser = {
  userName: "Kotaro",
  email: "Kotaro@theOtter.com",
} as unknown as User;
const mockRepo = {
  register: jest.fn(),
  login: jest.fn(),
} as unknown as UserRepository;
const mockToken = "otterToken";
const mockRemoveItem = jest.fn();
const mockNavigate = jest.fn();

Object.defineProperty(window, "localStorage", {
  value: {
    removeItem: mockRemoveItem,
    getItem: () => mockToken,
    setItem: jest.fn(),
  },
  writable: true,
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

function TestComponent() {
  const {
    handleRegisterUser,
    handleLoginUser,
    handleGetToken,
    handleLogoutUser,
  } = useUsers();

  return (
    <>
      <button onClick={() => handleRegisterUser(mockUser)}></button>
      <button onClick={() => handleLoginUser(mockUser)}></button>
      <button onClick={() => handleGetToken(mockToken)}></button>
      <button onClick={handleLogoutUser}></button>
    </>
  );
}

describe("Given the useUsers custom hook", () => {
  let elements: HTMLElement[];
  beforeEach(async () => {
    await act(() =>
      render(
        <Router>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </Router>
      )
    );
    elements = screen.getAllByRole("button");
  });
  describe("When is rendered", () => {
    test("Then the handleRegisterUser function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[0]);
        store.dispatch(registerUserAsync({ repo: mockRepo, user: mockUser }));
        expect(mockRepo.register).toHaveBeenCalled();
      });
    });

    test("Then the handleLoginUser function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[1]);
        store.dispatch(loginUserAsync({ repo: mockRepo, user: mockUser }));
        expect(mockRepo.login).toHaveBeenCalled();
      });
    });

    test("Then the handleGetToken function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[2]);
        store.dispatch(ac.getToken(mockToken));
        expect(store.getState().users.token).toBe(mockToken);
      });
    });

    test("Then the handleLogoutUser function should be called", async () => {
      await act(async () => {
        await userEvent.click(elements[3]);
        store.dispatch(ac.logoutUser());

        expect(mockRemoveItem).toHaveBeenCalledWith("userToken");
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });
  });
});
