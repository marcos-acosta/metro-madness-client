import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import MatchPreview from "./MatchPreview";

interface MatchesDashboardProps {
  matches: Match[];
}

export default function MatchesDashboard(props: MatchesDashboardProps) {
  return (
    <div className={styles.matchesDashboardInnerContainer}>
      {props.matches.map((match) => (
        <MatchPreview match={match} key={match.matchId} />
      ))}
    </div>
  );
}
