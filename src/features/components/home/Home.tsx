import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { useUsers } from "../../hooks/use.users";

export default function Home() {
  const token = localStorage.getItem("userToken");
  const { handleLogoutUser } = useUsers();

  return (
    <>
      <section className={styles.home}>
        {!token && (
          <>
            <li>
              <Link className={styles.home_links} to={"/register"}>
                Register
              </Link>
            </li>
            <li>
              <Link className={styles.home_links} to={"/login"}>
                Login
              </Link>
            </li>
          </>
        )}
        {token && (
          <li className={styles.logout} onClick={handleLogoutUser}>
            Logout
          </li>
        )}
        <li>
          <Link className={styles.home_links} to={"/perfumes"}>
            Perfumes
          </Link>
        </li>
      </section>
    </>
  );
}
