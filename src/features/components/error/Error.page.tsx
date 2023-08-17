import styles from "./Error.module.scss";
export default function ErrorPage() {
  return (
    <div className={styles.error_div}>
      <h2 className={styles.error}>404</h2>
      <p className={styles.text_error}>
        Oops, something went wrong The page you were trying to reach has either
        expired or is no longer valid.If you entered the link manually, please
        check it and try again.
      </p>
    </div>
  );
}
