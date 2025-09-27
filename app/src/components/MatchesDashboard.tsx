import { useState } from "react";
import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import MatchPreview from "./MatchPreview";
import Image from "next/image";

interface MatchesDashboardProps {
  matches: Match[];
  selectMatchId: (id: string) => void;
}

export default function MatchesDashboard(props: MatchesDashboardProps) {
  return (
    <div className={styles.matchesDashboardInnerContainer}>
      <div className={styles.matchesDashboardGrid}>
        {props.matches.map((match) => (
          <MatchPreview
            match={match}
            key={match.matchId}
            select={() => props.selectMatchId(match.matchId)}
          />
        ))}
      </div>
    </div>
  );
}
