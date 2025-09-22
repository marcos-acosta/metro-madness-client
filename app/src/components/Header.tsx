import Link from "next/link";
import styles from "./../../page.module.css";

export default function Header() {
  return (
    <div className={styles.headerInnerContainer}>
      <div className={styles.headerBackplate}>
        <div className={styles.headerTitleContainer}>
          <Link href="/"> Metro Madness</Link>
        </div>
      </div>
    </div>
  );
}
