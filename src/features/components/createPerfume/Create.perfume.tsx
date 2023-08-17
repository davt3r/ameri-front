import { SyntheticEvent } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import styles from "./Create.perfume.module.scss";

export default function PerfumeForm() {
  const navigate = useNavigate();

  const url = "http://localhost:4242/";

  const handleNewPerfume = async (event: SyntheticEvent) => {
    const formRegisterElement: HTMLFormElement =
      event.target as HTMLFormElement;

    event.preventDefault();

    const data = new FormData(formRegisterElement);
    const token = localStorage.getItem("userToken");

    const perfumeUrl = url + "perfume/create";
    const response = await fetch(perfumeUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
    const state = await response.json();

    if (state.error) {
      Swal.fire({
        width: "20em",
        icon: "error",
        title: "ERROR",
        text: "INCORRECT DATA",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "white",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 2000,
      });
    } else {
      Swal.fire({
        width: "20em",
        icon: "success",
        title: "Created",
        text: "CREATE SUCCESFULLY",
        background:
          "linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))",
        color: "white",
        iconColor: "white",
        showConfirmButton: false,
        padding: "4em 0",
        timer: 3000,
      });
    }

    state.perfumeData = state.perfume;
    delete state.perfume;

    navigate("/perfumes");
  };

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <form
          aria-label="form"
          className="perfume-form"
          id="perfumeform"
          onSubmit={handleNewPerfume}
        >
          <h2 className="title_form"> Create new perfume</h2>
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
              <select name="topNotes" id="topNotes">
                <option value="bergamote">Bergamote</option>
                <option value="ginger">Ginger</option>
                <option value="iris">Iris</option>
              </select>
            </div>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="baseNotes">
                Choose the Base Note
              </label>
              <select name="baseNotes" id="baseNotes">
                <option value="woodyNotes">Woody Notes</option>
                <option value="aquaticNotes">Aquatic Notes</option>
                <option value="flowerNotes">Flower Notes</option>
              </select>
            </div>
            <div className={styles.display}>
              <label className={styles.label} htmlFor="lastNotes">
                Choose the last Note
              </label>
              <select name="lastNotes" id="lastNotes">
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
            <input className={styles.file} type="file" name="image" />
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </section>
    </div>
  );
}
