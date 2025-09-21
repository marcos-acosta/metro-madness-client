"use client";

import { useState } from "react";
import { Match, RouteId } from "../interfaces";
import styles from "./../../page.module.css";
import {
  getAllRoutesStillCompeting,
  getCurrentWeek,
  getRoundToShowForWeek,
} from "../util";
import Header from "../components/Header";
import WeekHeader from "../components/WeekHeader";
import MatchesDashboard from "../components/MatchesDashboard";
import Bracket from "../components/Bracket";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { ROUND_NAMES } from "../constants";
import WeekSelector from "../components/WeekSelector";

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

  const roundToShow = getRoundToShowForWeek(selectedWeek);
  const dashboardHeaderText = ROUND_NAMES[roundToShow];

  return (
    <div className={styles.pageInnerContainer}>
      <div className={styles.headerOuterContainer}>
        <Header />
      </div>
      <div className={styles.weekHeaderOuterContainer}>
        <WeekHeader
          routes={routesToShowInHeader}
          weekStringDate={selectedWeek}
        />
      </div>
      <div className={styles.whiteBg}>
        <div className={styles.weekSelectorOuterContainer}>
          <WeekSelector
            matches={storedMatches}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </div>
        <div className={styles.sectionHeaderOuterContainer}>
          <SectionHeader text={dashboardHeaderText} />
        </div>
        <div className={styles.matchesDashboardOuterContainer}>
          <MatchesDashboard matches={matchesForSelectedWeek} />
        </div>
        <div className={styles.sectionHeaderOuterContainer}>
          <SectionHeader text={"Bracket"} />
        </div>
        <div className={styles.bracketOuterContainer}>
          <Bracket matches={matchesForSelectedWeek} />
        </div>
      </div>
      <div className={styles.footerOuterContainer}>
        <Footer />
      </div>
    </div>
  );
}
