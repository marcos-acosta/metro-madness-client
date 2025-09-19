import { Match } from "../interfaces";
import BracketMatch from "./BracketMatch";
import styles from "./../../page.module.css";

interface BracketProps {
  matches: Match[];
}

export default function Bracket(props: BracketProps) {
  // Create a map of matchId to Match for easy lookup
  const matchMap = new Map<string, Match>();
  props.matches.forEach((match) => {
    matchMap.set(match.matchId, match);
  });

  // Helper function to get match by ID or return placeholder
  const getMatch = (matchId: string) => {
    return matchMap.get(matchId) || null;
  };

  return (
    <div className={styles.bracket}>
      {/* Round 1 - Left Side */}
      <div className={styles.round}>
        <div className={styles.matchSlot}>
          {getMatch("1") && <BracketMatch match={getMatch("1")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("2") && <BracketMatch match={getMatch("2")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("3") && <BracketMatch match={getMatch("3")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("4") && <BracketMatch match={getMatch("4")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("5") && <BracketMatch match={getMatch("5")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("6") && <BracketMatch match={getMatch("6")!} />}
        </div>
      </div>

      {/* Round 2 - Round of 16 */}
      <div className={styles.round}>
        <div className={styles.matchSlot}>
          {getMatch("7") && <BracketMatch match={getMatch("7")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("8") && <BracketMatch match={getMatch("8")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("9") && <BracketMatch match={getMatch("9")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("10") && <BracketMatch match={getMatch("10")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("11") && <BracketMatch match={getMatch("11")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("12") && <BracketMatch match={getMatch("12")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("13") && <BracketMatch match={getMatch("13")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("14") && <BracketMatch match={getMatch("14")!} />}
        </div>
      </div>

      {/* Round 3 - Quarterfinals */}
      <div className={styles.round}>
        <div className={styles.matchSlot}>
          {getMatch("15") && <BracketMatch match={getMatch("15")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("16") && <BracketMatch match={getMatch("16")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("17") && <BracketMatch match={getMatch("17")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("18") && <BracketMatch match={getMatch("18")!} />}
        </div>
      </div>

      {/* Finals */}
      <div className={styles.round}>
        <div className={styles.matchSlot}>
          {getMatch("19") && <BracketMatch match={getMatch("19")!} />}
        </div>
        <div className={styles.matchSlot}>
          {getMatch("20") && <BracketMatch match={getMatch("20")!} />}
        </div>
      </div>

      {/* Championship */}
      <div className={styles.round}>
        <div className={styles.matchSlot}>
          {getMatch("21") && <BracketMatch match={getMatch("21")!} />}
        </div>
      </div>
    </div>
  );
}
