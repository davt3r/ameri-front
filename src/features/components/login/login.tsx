import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUsers } from "../../hooks/use.users";
import { User } from "../../models/user";
import styles from "./Login.module.scss";

export default function Login() {
  const navigate = useNavigate();
  const { handleLoginUser } = useUsers();
  const [authError, setAuthError] = useState(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const usernameInput = element.querySelector(
      'input[name="user"]'
    ) as HTMLInputElement;
    const passwordInput = element.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (!usernameInput.value || !passwordInput.value) {
      setAuthError(true);
      return;
    }

    const loggedUser = {
      user: usernameInput.value,
      password: passwordInput.value,
    } as Partial<User>;

    const loginSuccess = await handleLoginUser(loggedUser);
    if (loginSuccess) {
      navigate("/perfumes");
      Swal.fire({
        width: "20em",
        icon: "success",
        title: "LOGGED",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "white",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 3000,
      });
    } else {
      setAuthError(true);
    }
  };

  return (
    <section className="login">
      <h2 className={styles.login}>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input type="text" id="user" name="user" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <button className={styles.button} type="submit">
          SEND
        </button>
      </form>
    </section>
  );
}
