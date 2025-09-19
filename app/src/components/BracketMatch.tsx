import { Match } from "../interfaces";
import { combineClasses } from "../util";
import styles from "./../../page.module.css";

interface BracketMatchProps {
  match: Match;
}

export default function BracketMatch(props: BracketMatchProps) {
  const firstRoute = props.match.matchData.competingTrips[0].routeId;
  const secondRoute = props.match.matchData.competingTrips[1].routeId;
  const winner = props.match.matchData.matchResult?.winner;
  return (
    <div className={styles.bracketMatchContainer}>
      <div
        className={combineClasses(
          styles.bracketRouteContainer,
          winner === firstRoute && styles.winner
        )}
      >
        {firstRoute || "?"}
      </div>
      <div
        className={combineClasses(
          styles.bracketRouteContainer,
          winner === secondRoute && styles.winner
        )}
      >
        {secondRoute || "?"}
      </div>
    </div>
  );
}
