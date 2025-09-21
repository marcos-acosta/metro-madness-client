import styles from "./../../page.module.css";

export default function Footer() {
  return (
    <div className={styles.footerInnerContainer}>
      <div className={styles.footerTextContainer}>
        <b>Metro Madness</b> is a weekly single-elimination tournament that pits
        unsuspecting NYC subway trains against one another in a contest of
        punctuality. Games start every weekday at 5pm. Each game is a
        competition between two <i>individual</i> trains from two different
        services. The first train that departs from a terminal station after 5pm
        becomes the representative for its service. For example, if the Q and
        the 3 are competing, then the first Q train to depart from either 96 St
        or Coney Island-Stillwell Av will compete against the first 3 train to
        depart from either Harlem 148 St or New Lots Av. The &quot;finish
        line&quot; is a number of stops, which will be the same for both
        competing trains. The train which is the <i>least delayed</i> after
        passing that many stops wins and proceeds to the next round. This
        project was made with 🚇 by{" "}
        <a
          href="https://marcos.ac"
          target="_blank"
          rel="noreferrer"
          className={styles.textLink}
        >
          Marcos Acosta
        </a>{" "}
        and uses{" "}
        <a
          href="https://github.com/jamespfennell/transiter"
          target="_blank"
          rel="noreferrer"
          className={styles.textLink}
        >
          Transiter
        </a>{" "}
        for real-time transit data.
      </div>
      <div className={styles.footerBlackBar} />
    </div>
  );
}
