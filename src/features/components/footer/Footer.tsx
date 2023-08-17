import styles from "./Footer.module.scss";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.web_display}>
        <img
          className={styles.web}
          width={45}
          height={45}
          src="/unnamed 2.png"
          alt="webs"
        />
        <img
          className={styles.web}
          width={40}
          height={40}
          src="/unnamed 1.png"
          alt="webs"
        />
        <img
          className={styles.web}
          width={40}
          height={40}
          src="/geografiaehistoria 1.png"
          alt="webs"
        />
      </section>
    </footer>
  );
}
