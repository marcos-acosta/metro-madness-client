import { ROUND_NAMES } from "../constants";
import { Match, MatchStatus } from "../interfaces";
import { matchIdToRoundNumber } from "../util";
import styles from "./../../page.module.css";
import TripPreview from "./TripPreview";

interface MatchPreviewProps {
  match: Match;
  select: () => void;
}

const matchStatusToText = {
  [MatchStatus.NOT_YET_STARTED]: "Upcoming",
  [MatchStatus.ONGOING]: "Live",
  [MatchStatus.ENDED]: "Final",
};

export default function MatchPreview(props: MatchPreviewProps) {
  const matchStatus = matchStatusToText[props.match.matchData.matchStatus];
  const roundName = ROUND_NAMES[matchIdToRoundNumber(props.match.matchId)];
  const winner = props.match.matchData.matchResult?.winner;
  const victoryType = props.match.matchData.matchResult?.victoryType;
  const loserRow =
    winner &&
    (props.match.matchData.competingTrips[0].routeId === winner ? 2 : 1);

  return (
    <button onClick={props.select}>
      <div className={styles.matchPreviewInnerContainer}>
        <div className={styles.matchPreviewHeader}>
          <div className={styles.roundNameContainer}>{roundName}</div>
          <div className={styles.matchPreviewStatusContainer}>
            {matchStatus}
          </div>
        </div>
        <div className={styles.matchPreviewWhiteLine} />
        <div className={styles.matchPreviewLinesContainer}>
          {props.match.matchData.competingTrips.map((trip, i) => (
            <TripPreview
              key={trip.routeId}
              tripData={trip}
              numStops={props.match.matchData.numStopsToFinish}
              row={i + 1}
              finished={winner !== undefined}
              won={winner === trip.routeId}
              victoryType={victoryType}
            />
          ))}
          {winner && (
            <div
              className={styles.previewLoserShader}
              style={{ gridRow: `${loserRow}` }}
            />
          )}
        </div>
      </div>
    </button>
  );
}
