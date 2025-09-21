"use client";

import { useState } from "react";
import { Match, RouteId } from "../interfaces";
import styles from "./../../page.module.css";
import { getAllRoutesStillCompeting, getCurrentWeek, isSunday } from "../util";
import Header from "../components/Header";
import WeekSelector from "../components/WeekSelector";
import MatchesDashboard from "../components/MatchesDashboard";
import Bracket from "../components/Bracket";
import Footer from "../components/Footer";
import { NUM_MATCHES } from "../constants";

interface HomepageLayoutProps {
  initialMatches: Match[];
}

export default function HomepageLayout(props: HomepageLayoutProps) {
  const [storedMatches, setStoredMatches] = useState(props.initialMatches);
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());

  const matchesForSelectedWeek = storedMatches.filter(
    (match) => match.bracketId === selectedWeek
  );

  const routesToShowInHeader = getAllRoutesStillCompeting(
    matchesForSelectedWeek
  );

  return (
    <div className={styles.pageInnerContainer}>
      <div className={styles.headerOuterContainer}>
        <Header />
      </div>
      <div className={styles.weekSelectorOuterContainer}>
        <WeekSelector
          currentWeek={selectedWeek}
          setCurrentWeek={setSelectedWeek}
          routes={routesToShowInHeader}
        />
      </div>
      <div className={styles.matchesDashboardOuterContainer}>
        <MatchesDashboard matches={matchesForSelectedWeek} />
      </div>
      <div className={styles.bracketOuterContainer}>
        <Bracket matches={matchesForSelectedWeek} />
      </div>
      <div className={styles.footerOuterContainer}>
        <Footer />
      </div>
    </div>
  );
}
