import Header from "../src/components/Header";
import styles from "./../page.module.css";

export default function page() {
  return (
    <div className={styles.pageInnerContainer}>
      <div className={styles.headerOuterContainer}>
        <Header />
      </div>
      <div className={styles.aboutSectionContainer}>About</div>
    </div>
  );
}
