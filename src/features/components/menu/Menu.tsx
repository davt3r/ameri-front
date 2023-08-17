import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";
export function Menu() {
  return (
    <nav className={styles.menu}>
      <ul>
        <li>
          <Link className={styles.link} to={"/perfumes"}>
            PERFUMES
          </Link>
        </li>
        <span></span>
        <li>
          <Link className={styles.link} to="/">
            HOME
          </Link>
        </li>
      </ul>
    </nav>
  );
}
