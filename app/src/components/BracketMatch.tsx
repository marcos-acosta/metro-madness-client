import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import BracketMatchRoute from "./BracketMatchRoute";

interface BracketMatchProps {
  match: Match;
}

export default function BracketMatch(props: BracketMatchProps) {
  const firstRoute = props.match.matchData.competingTrips[0].routeId;
  const secondRoute = props.match.matchData.competingTrips[1].routeId;
  const winner = props.match.matchData.matchResult?.winner;
  return (
    <div className={styles.bracketMatchContainer}>
      <BracketMatchRoute
        routeId={firstRoute}
        winner={winner && winner === firstRoute}
        decided={Boolean(winner)}
      />
      <BracketMatchRoute
        routeId={secondRoute}
        winner={winner && winner === secondRoute}
        decided={Boolean(winner)}
      />
    </div>
  );
}
