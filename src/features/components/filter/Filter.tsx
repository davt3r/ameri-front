import { SyntheticEvent } from "react";
import styles from "./filter.module.scss";
import { usePerfumes } from "../../hooks/use.perfumes";
import { RootState } from "../../../core/store/store";
import { useSelector } from "react-redux";

export function Filter() {
  const { handleFilterPerfumes } = usePerfumes();
  const { perfumes } = useSelector((state: RootState) => state.perfumes);

  const handleSelect = (event: SyntheticEvent) => {
    const element = event.target as HTMLSelectElement;
    if (element.name === "season") {
      const filter = `/?season=${element.value}`;
      console.log(filter);
      console.log(handleFilterPerfumes(filter));
      return perfumes;
    }
    if (element.name === "reset") {
      window.location.reload();
    }
  };

  return (
    <div className={styles.filter}>
      <select className={styles.button} name="season" onChange={handleSelect}>
        <option>Season</option>
        <option value="winter">Winter</option>
        <option value="spring">Spring</option>
        <option value="summer">Summer</option>
        <option value="autumn">Autumn</option>
      </select>
      <button className={styles.reset} name="reset" onClick={handleSelect}>
        Reset
      </button>
    </div>
  );
}
