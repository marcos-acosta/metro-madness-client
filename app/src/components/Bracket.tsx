import { Match } from "../interfaces";
import BracketMatch from "./BracketMatch";
import styles from "./../../page.module.css";
import { ROUND_NAMES } from "../constants";
import { combineClasses } from "../util";

interface BracketProps {
  matches: Match[];
  selectedRound: number;
}

const MATCH_HEIGHT_PX = 60;
const MATCH_WIDTH_PX = 230;
const ROUND_WIDTH_PX = 250;
const SMALL_GAP_SIZE = 20;

export default function Bracket(props: BracketProps) {
  // Create a map of matchId to Match for easy lookup
  const matchMap = new Map<string, Match>();
  props.matches.forEach((match) => {
    matchMap.set(match.matchId, match);
  });

  // Helper function to get match by ID or return placeholder
  const getMatch = (matchId: string) => {
    const match = matchMap.get(matchId);
    if (!Object.keys(MATCH_VERTICAL_OFFSETS).includes(matchId)) {
      return null;
    }
    const verticalOffset =
      MATCH_VERTICAL_OFFSETS[matchId as keyof typeof MATCH_VERTICAL_OFFSETS];
    return match ? (
      <div
        className={styles.matchOuterContainer}
        style={{
          top: `${verticalOffset}px`,
          width: `${MATCH_WIDTH_PX}px`,
          height: `${MATCH_HEIGHT_PX}px`,
        }}
      >
        <BracketMatch match={match} />
      </div>
    ) : null;
  };

  const matchIdToRound = (matchId: string) => {
    const matchIdInt = parseInt(matchId);
    if (matchIdInt < 7) {
      return 0;
    } else if (matchIdInt < 15) {
      return 1;
    } else if (matchIdInt < 19) {
      return 2;
    } else if (matchIdInt < 21) {
      return 3;
    } else {
      return 4;
    }
  };

  const getMatchBracketConnector = (matchId: string) => {
    const verticalOffset =
      MATCH_VERTICAL_OFFSETS[matchId as keyof typeof MATCH_VERTICAL_OFFSETS];
    const round = matchIdToRound(matchId);
    const baseTop = verticalOffset + MATCH_HEIGHT_PX / 2;
    const fullVerticalBarHeight =
      (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) * Math.pow(2, Math.max(round - 1, 0));
    const top =
      round === 0 ? baseTop - (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) / 2 : baseTop;
    const actualBarHeight =
      round === 0 ? fullVerticalBarHeight / 2 : fullVerticalBarHeight;
    return (
      <div
        className={round === 0 ? styles.bottomConnector : styles.forkConnector}
        style={{
          top: `${top - 1}px`,
          width: `${ROUND_WIDTH_PX - MATCH_WIDTH_PX * 0.75}px`,
          height: `${actualBarHeight + 1}px`,
          left: `${MATCH_WIDTH_PX}px`,
        }}
      />
    );
  };

  const MATCH_VERTICAL_OFFSETS = {
    "1":
      1 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "2":
      3 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "3":
      4 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "4":
      5 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "5":
      7 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "6":
      8 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "9": 0,
    "7": MATCH_HEIGHT_PX + SMALL_GAP_SIZE,
    "10": 2 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "11": 3 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "12": 4 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "8": 5 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "13": 6 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "14": 7 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE),
    "15":
      1 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "16":
      3 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "17":
      5 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "18":
      7 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "19":
      2 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "20":
      6 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
    "21":
      4 * (MATCH_HEIGHT_PX + SMALL_GAP_SIZE) -
      SMALL_GAP_SIZE / 2 -
      MATCH_HEIGHT_PX / 2,
  };

  const TOTAL_BRACKET_HEIGHT =
    MATCH_VERTICAL_OFFSETS["6"] + MATCH_HEIGHT_PX + 50;

  return (
    <div
      className={styles.bracket}
      style={{
        gridTemplateColumns: `repeat(5, ${ROUND_WIDTH_PX}px)`,
        height: `${TOTAL_BRACKET_HEIGHT}px`,
      }}
    >
      {[0, 1, 2, 3, 4].map((roundNumber) => (
        <div className={styles.roundHeader} key={roundNumber}>
          <div
            className={combineClasses(
              styles.roundHeaderText,
              props.selectedRound === roundNumber && styles.selectedRound
            )}
          >
            {ROUND_NAMES[roundNumber]}
          </div>
        </div>
      ))}
      <div className={styles.round} id="round-1">
        {getMatch("1")}
        {getMatchBracketConnector("1")}
        {getMatch("2")}
        {getMatchBracketConnector("2")}
        {getMatch("3")}
        {getMatchBracketConnector("3")}
        {getMatch("4")}
        {getMatchBracketConnector("4")}
        {getMatch("5")}
        {getMatchBracketConnector("5")}
        {getMatch("6")}
        {getMatchBracketConnector("6")}
      </div>
      <div className={styles.round} id="round-2">
        {getMatch("9")}
        {getMatch("7")}
        {getMatchBracketConnector("9")}
        {getMatch("10")}
        {getMatch("11")}
        {getMatchBracketConnector("10")}
        {getMatch("12")}
        {getMatch("8")}
        {getMatchBracketConnector("12")}
        {getMatch("13")}
        {getMatch("14")}
        {getMatchBracketConnector("13")}
      </div>
      <div className={styles.round} id="round-3">
        {getMatch("15")}
        {getMatch("16")}
        {getMatchBracketConnector("15")}
        {getMatch("17")}
        {getMatch("18")}
        {getMatchBracketConnector("17")}
      </div>
      <div className={styles.round} id="round-4">
        {getMatch("19")}
        {getMatch("20")}
        {getMatchBracketConnector("19")}
      </div>
      <div className={styles.round} id="round-5">
        {getMatch("21")}
      </div>
    </div>
  );
}
