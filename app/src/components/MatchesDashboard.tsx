import { useState } from "react";
import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import MatchPreview from "./MatchPreview";
import Image from "next/image";

interface MatchesDashboardProps {
  matches: Match[];
}

const SHORTENED_LIST_LENGTH = 2;

export default function MatchesDashboard(props: MatchesDashboardProps) {
  const [showAllPreviews, setShowAllPreviews] = useState(false);

  const matchesToShow = showAllPreviews
    ? props.matches
    : props.matches.slice(0, SHORTENED_LIST_LENGTH);
  const matchesToHide = props.matches.length > SHORTENED_LIST_LENGTH;

  return (
    <div className={styles.matchesDashboardInnerContainer}>
      <div className={styles.matchesDashboardGrid}>
        {matchesToShow.map((match) => (
          <MatchPreview match={match} key={match.matchId} />
        ))}
      </div>
      {matchesToHide && (
        <div className={styles.showHideContainer}>
          <div className={styles.showHideTextAndArrowContainer}>
            <button
              className={styles.showHideText}
              onClick={() => setShowAllPreviews(!showAllPreviews)}
            >
              {showAllPreviews ? "Collapse" : "Show all"}
            </button>
            <div className={styles.arrowContainer}>
              <Image
                className={styles.expandArrow}
                src="/arrows/right-arrow.svg"
                width="15"
                height="15"
                alt="Arrow"
                style={{ rotate: `${showAllPreviews ? 270 : 90}deg` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
