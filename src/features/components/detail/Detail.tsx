import { useNavigate, useParams } from "react-router-dom";
import { Perfume } from "../../models/perfume";
import styles from "./Detail.module.scss";
import { usePerfumes } from "../../hooks/use.perfumes";

export default function PerfumeDetail() {
  const { id } = useParams();
  const { perfumes, handleDelete } = usePerfumes();
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  const item: Perfume = perfumes.find((item) => item.id === id) as Perfume;

  return (
    <>
      <section className={styles.card_structure}>
        {token && (
          <section className={styles.buttons}>
            <button
              className={styles.delete}
              onClick={() => {
                handleDelete(id as string);
                navigate("/perfumes");
              }}
            >
              Delete
            </button>
            <button
              className={styles.edit_button}
              onClick={() => navigate("/edit/" + item.id)}
              key={item.id}
            >
              Edit
            </button>
          </section>
        )}
        <ul>
          <li className={styles.name}> {item.name}</li>
          <li>
            <img
              src={item.image.url}
              alt={item.name}
              width={160}
              height={180}
            />
            <p className={styles.season}>Season: {item.season}</p>
            <p className={styles.detail}>Description {item.description}</p>
          </li>
        </ul>
      </section>
    </>
  );
}
