"use client";

import { useState } from "react";
import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import { getCurrentWeek } from "../util";
import Header from "../components/Header";
import WeekSelector from "../components/WeekSelector";
import MatchesDashboard from "../components/MatchesDashboard";
import Bracket from "../components/Bracket";
import Footer from "../components/Footer";

interface HomepageLayoutProps {
  initialMatches: Match[];
}

export default function HomepageLayout(props: HomepageLayoutProps) {
  const [storedMatches, setStoredMatches] = useState(props.initialMatches);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  const matchesForThisWeek = storedMatches.filter(
    (match) => match.bracketId === currentWeek
  );

  return (
    <div className={styles.pageInnerContainer}>
      <div className={styles.headerOuterContainer}>
        <Header />
      </div>
      <div className={styles.weekSelectorOuterContainer}>
        <WeekSelector
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
        />
      </div>
      <div className={styles.matchesDashboardOuterContainer}>
        <MatchesDashboard matches={matchesForThisWeek} />
      </div>
      <div className={styles.bracketOuterContainer}>
        <Bracket matches={matchesForThisWeek} />
      </div>
      <div className={styles.footerOuterContainer}>
        <Footer />
      </div>
    </div>
  );
}
