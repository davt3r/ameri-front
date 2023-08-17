import { SyntheticEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usePerfumes } from "../../hooks/use.perfumes";
import { RootState } from "../../../core/store/store";
import { Perfume } from "../../models/perfume";
import styles from "./Edit.perfume.module.scss";

export default function EditPerfumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { perfumes } = useSelector((state: RootState) => state.perfumes);
  const { handleEditPerfume } = usePerfumes();

  const perfume: Perfume = perfumes.find(
    (item: Perfume) => item.id === id
  ) as Perfume;

  const handleEditForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    const data: Partial<Perfume> = {
      id: perfume.id,
      name: (formRegisterElement.elements.namedItem("name") as HTMLFormElement)
        .value,
      season: (
        formRegisterElement.elements.namedItem("season") as HTMLFormElement
      ).value,
      topNotes: (
        formRegisterElement.elements.namedItem("topNotes") as HTMLFormElement
      ).value,
      baseNotes: (
        formRegisterElement.elements.namedItem("baseNotes") as HTMLFormElement
      ).value,
      lastNotes: (
        formRegisterElement.elements.namedItem("lastNotes") as HTMLFormElement
      ).value,
      description: (
        formRegisterElement.elements.namedItem("description") as HTMLFormElement
      ).value,
    };

    await handleEditPerfume(data);
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <form
          className="perfume-form"
          id="form"
          onSubmit={handleEditForm}
          aria-label="form"
        >
          <h2 className="title_form"> Edit perfume</h2>
          <div className={styles.inputs}>
            <input type="text" placeholder="name" name="name"></input>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="season">
                Choose a season
              </label>
              <select name="season" id="season">
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
              </select>
            </div>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="topNotes">
                Choose the Top Note
              </label>
              <select name="topNotes" id="top-note">
                <option value="bergamote">Bergamote</option>
                <option value="ginger">Ginger</option>
                <option value="iris">Iris</option>
              </select>
            </div>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="baseNotes">
                Choose the Base Note
              </label>
              <select name="baseNotes" id="base-note">
                <option value="woodyNotes">Woody Notes</option>
                <option value="aquaticNotes">Aquatic Notes</option>
                <option value="flowerNotes">Flower Notes</option>
              </select>
            </div>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="lastNotes">
                Choose the last Note
              </label>
              <select name="lastNotes" id="last-note">
                <option value="vetiver">Vetiver</option>
                <option value="patchouli">Patchouli</option>
                <option value="sandal">Sandal</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="description"
              name="description"
            ></input>
            <button type="submit">SUBMIT</button>{" "}
          </div>
        </form>
      </section>
    </div>
  );
}
