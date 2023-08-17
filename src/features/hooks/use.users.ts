import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState, store } from "../../core/store/store";
import { useMemo } from "react";
import { ac } from "../redux/users.slice";
import { User } from "../models/user";
import { UserRepository } from "../../core/services/user.repository";
import { loginUserAsync, registerUserAsync } from "../redux/thunks";
import { useNavigate } from "react-router-dom";
export function useUsers() {
  const navigate = useNavigate();

  const { users, token } = useSelector((state: RootState) => state.users);
  const dispatch: AppDispatch = useDispatch();
  const url = "http://localhost:4242/";

  const repo: UserRepository = useMemo(() => new UserRepository(url), []);

  const handleRegisterUser = async (user: Partial<User>) => {
    dispatch(registerUserAsync({ repo, user }));
  };

  const handleLoginUser = async (user: Partial<User>): Promise<boolean> => {
    await dispatch(loginUserAsync({ repo, user }));
    const loggedUser = store.getState().users.currentUser;
    localStorage.setItem("userToken", loggedUser.token as string);
    return !!loggedUser.token;
  };

  const handleGetToken = (token: string) => {
    dispatch(ac.getToken(token));
  };

  const handleLogoutUser = () => {
    dispatch(ac.logoutUser());
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return {
    handleLogoutUser,
    users,
    handleRegisterUser,
    handleLoginUser,
    token: token,
    handleGetToken,
  };
}
