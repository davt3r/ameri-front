import { useEffect } from "react";
import { usePerfumes } from "../../hooks/use.perfumes";
import { Card } from "../card/Card";
import styles from "./List.module.scss";
import { useNavigate } from "react-router-dom";
import { Perfume } from "../../models/perfume";
import { Filter } from "../filter/Filter";

export default function List() {
  const { handleLoadPerfumes, perfumes } = usePerfumes();

  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    handleLoadPerfumes();
  }, [handleLoadPerfumes]);

  return (
    <>
      <Filter></Filter>
      <div className={styles.container}>
        <ul className={styles.perfume} role="list">
          {perfumes.map((item: Perfume) => (
            <Card item={item} key={item.id}></Card>
          ))}
        </ul>
        {token && (
          <button
            onClick={() => navigate("/create")}
            className={styles.create}
            type="submit"
          >
            Create
          </button>
        )}
      </div>
    </>
  );
}
