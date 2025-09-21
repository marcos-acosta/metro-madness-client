import Link from "next/link";
import styles from "./../../page.module.css";

interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <div className={styles.headerInnerContainer}>
      <div className={styles.headerBackplate}>
        <div className={styles.headerHorizontalBar}></div>
        <div className={styles.headerContentContainer}>
          <div className={styles.headerLogoContainer}>
            <Link href="/"> Metro Madness</Link>
          </div>
          <div className={styles.headerSideContainer}>
            <div className={styles.aboutText}>
              <Link href="/about">↪ How does this work?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
