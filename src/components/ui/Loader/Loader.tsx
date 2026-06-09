import styles from './Loader.module.css';

export function Loader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Загрузка">
      <div className={styles.spinner} />
    </div>
  );
}
