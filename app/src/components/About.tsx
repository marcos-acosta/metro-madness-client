import styles from "./../../page.module.css";

export default function About() {
  return (
    <div className={styles.aboutInnerContainer}>
      <b>Metro Madness</b> is a weekly single-elimination tournament that pits
      unsuspecting NYC subway trains against one another in a contest of
      punctuality. Games start every weekday at 5pm. Each game is a competition
      between two <i>individual</i> trains from two different services. The
      first train that departs from a terminal station after 5pm becomes the
      representative for its service. For example, if the Q and the 3 are
      competing, then the first Q train to depart from either 96 St or Coney
      Island-Stillwell Av will compete against the first 3 train to depart from
      either Harlem 148 St or New Lots Av. The &quot;finish line&quot; is a
      number of stops, which will be the same for both competing trains. The
      train which is the <i>least delayed</i> after passing that many stops wins
      that game and its service proceeds to the next round.
    </div>
  );
}
