import styles from "./Header.module.scss";

export function Header() {
  const title = "AMERI";
  return (
    <>
      <header className={styles.header}>
        <h1>{title}</h1>
      </header>
    </>
  );
}
