import { AppRoutes } from "../app.routes/app.routes";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Menu } from "../menu/Menu";
import styles from "./App.module.scss";

export function App() {
  return (
    <>
      <div className={styles.background}>
        <Header></Header>
        <Menu></Menu>
        <AppRoutes></AppRoutes>
        <Footer></Footer>
      </div>
    </>
  );
}
