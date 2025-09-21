import Link from "next/link";
import styles from "./../../page.module.css";

interface HeaderProps {}

export default function Header(props: HeaderProps) {
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
