import { SyntheticEvent } from "react";
import { useUsers } from "../../hooks/use.users";
import { User } from "../../models/user";
import styles from "./Register.module.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { handleRegisterUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      userName: (formElement.user as HTMLInputElement).value,
      email: (formElement.email as HTMLInputElement).value,
      password: (formElement.password as HTMLInputElement).value,
    } as unknown as Partial<User>;

    if (data.userName === "" || data.email === "" || data.password === "") {
      Swal.fire({
        width: "20em",
        icon: "error",
        title: "ERROR",
        text: "ALL INPUTS ARE REQUIRED",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "white",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 2000,
      });
    } else {
      handleRegisterUser(data);

      formElement.reset();
      navigate("/");

      Swal.fire({
        width: "20em",
        icon: "success",
        title: "SIGNED UP",
        text: "NOW WE NEED YOU TO USE THE LOGIN FORM",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "white",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 3000,
      });
    }
  };

  return (
    <>
      <section className="login_box">
        <h2 className={styles.register}>Register</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.user_box}>
            <label htmlFor="user">UserName</label>
            <input type="text" id="user" name="user" />
          </div>
          <div className={styles.user_box}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.email}
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div>
            <label className={styles.password} htmlFor="password">
              Password{" "}
            </label>
            <input
              className={styles.password_box}
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
      </section>
    </>
  );
}
