"use client";

import { useEffect, useState } from "react";
import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import {
  formatDateShort,
  getAllRoutesStillCompeting,
  getCurrentWeek,
  getDateForWeekAndRound,
  getMatchesInRound,
  getRoundToShowForWeek,
  hasBothCompetitors,
  isGameTime,
  matchesToCacheFormat,
} from "../util";
import Header from "../components/Header";
import WeekHeader from "../components/WeekHeader";
import MatchesDashboard from "../components/MatchesDashboard";
import Bracket from "../components/Bracket";
import Footer from "../components/Footer";
import SectionHeader from "../components/SectionHeader";
import { ROUND_NAMES } from "../constants";
import { fetchBracketForWeek } from "../server";
import Navigator from "../components/Navigator";
import SeeAllWeeks from "../components/SeeAllWeeks";
import FullPageMatch from "../components/FullPageMatch";

interface HomepageLayoutProps {
  initialMatches: Match[];
}

export default function HomepageLayout(props: HomepageLayoutProps) {
  const [storedMatches, setStoredMatches] = useState<Record<string, Match>>(
    matchesToCacheFormat(props.initialMatches)
  );
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek());
  const [selectedRound, setSelectedRound] = useState(
    getRoundToShowForWeek(getCurrentWeek())
  );
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<Date>(new Date());

  const matchesForSelectedWeek = Object.values(storedMatches).filter(
    (match) => match.bracketId === selectedWeek
  );

  const dateToShow = getDateForWeekAndRound(selectedWeek, selectedRound);

  const roundName = ROUND_NAMES[selectedRound];

  const matchesInRoundToShow = getMatchesInRound(
    matchesForSelectedWeek,
    selectedRound
  ).filter(hasBothCompetitors);

  const selectedMatch = matchesForSelectedWeek.find(
    (match) => match.matchId === selectedMatchId
  );

  const update = async () => {
    if (isGameTime()) {
      const bracketsForWeek = await fetchBracketForWeek(selectedWeek);
      setStoredMatches((currentMatches) => ({
        ...currentMatches,
        ...matchesToCacheFormat(bracketsForWeek.matches),
      }));
      setLastUpdatedTime(new Date());
    }
  };

  const routesToShowInHeader = selectedMatch
    ? selectedMatch.matchData.competingTrips.map((trip) => trip.routeId!)
    : getAllRoutesStillCompeting(matchesForSelectedWeek);

  useEffect(() => {
    const interval = setInterval(update, 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

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
        {selectedMatch ? (
          <>
            <div className={styles.sectionHeaderOuterContainer}>
              <SectionHeader
                text={`${formatDateShort(dateToShow)}: ${
                  selectedMatch.matchData.competingTrips[0].routeId
                } train / ${
                  selectedMatch.matchData.competingTrips[1].routeId
                } train`}
              >
                <Navigator
                  onBack={() => {
                    setSelectedMatchId(null);
                  }}
                />
              </SectionHeader>
              <FullPageMatch match={selectedMatch} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.sectionHeaderOuterContainer}>
              <SectionHeader
                text={`${formatDateShort(dateToShow)}: ${roundName}`}
              >
                <Navigator
                  onBack={() => {
                    setSelectedRound(selectedRound - 1);
                  }}
                  onForward={() => {
                    setSelectedRound(selectedRound + 1);
                  }}
                  backDisabled={selectedRound === 0}
                  forwardDisabled={selectedRound === 4}
                />
              </SectionHeader>
            </div>
            <div className={styles.matchesDashboardOuterContainer}>
              <MatchesDashboard
                matches={matchesInRoundToShow}
                selectMatchId={setSelectedMatchId}
              />
            </div>
            <div className={styles.sectionHeaderOuterContainer}>
              <SectionHeader text={"Bracket"} />
            </div>
            <div className={styles.bracketOuterContainer}>
              <Bracket
                matches={matchesForSelectedWeek}
                selectedRound={selectedRound}
                setSelectedMatch={setSelectedMatchId}
              />
            </div>
            <div className={styles.weekSelectorOuterContainer}>
              <SeeAllWeeks callback={() => {}} />
            </div>
          </>
        )}
      </div>
      <div className={styles.footerOuterContainer}>
        <Footer />
      </div>
    </div>
  );
}
