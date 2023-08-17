import { Link } from "react-router-dom";
import { Perfume } from "../../models/perfume";
import styles from "./Card.module.scss";

type PropsType = {
  item: Perfume;
};

export function Card({ item }: PropsType) {
  return (
    <Link to={"/details/" + item.id} className={styles.name}>
      <li className={styles.card} key={item.id}>
        <img
          src={item.image.url}
          alt={item.name}
          width="160"
          height="180"
          className={styles.image}
        />
        <p className={styles.name_box}> {item.name}</p>
      </li>
    </Link>
  );
}
