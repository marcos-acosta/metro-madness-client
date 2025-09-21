import { ROUND_NAMES } from "../constants";
import { Match, MatchStatus } from "../interfaces";
import { matchIdToRoundNumber } from "../util";
import styles from "./../../page.module.css";
import TripPreview from "./TripPreview";

interface MatchPreviewProps {
  match: Match;
}

const matchStatusToText = {
  [MatchStatus.NOT_YET_STARTED]: "Upcoming",
  [MatchStatus.ONGOING]: "Live",
  [MatchStatus.ENDED]: "Final",
};

export default function MatchPreview(props: MatchPreviewProps) {
  const matchStatus = matchStatusToText[props.match.matchData.matchStatus];
  const roundName = ROUND_NAMES[matchIdToRoundNumber(props.match.matchId)];

  return (
    <div className={styles.matchPreviewInnerContainer}>
      <div className={styles.matchPreviewHeader}>
        <div className={styles.roundNameContainer}>{roundName}</div>
        <div className={styles.matchPreviewStatusContainer}>{matchStatus}</div>
      </div>
      <div className={styles.matchPreviewWhiteLine} />
      <div className={styles.matchPreviewLinesContainer}>
        {props.match.matchData.competingTrips.map((trip) => (
          <TripPreview
            key={trip.routeId}
            tripData={trip}
            numStops={props.match.matchData.numStopsToFinish}
          />
        ))}
      </div>
    </div>
  );
}
