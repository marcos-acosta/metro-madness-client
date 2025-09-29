"use client";

import { useEffect, useState } from "react";
import { Match } from "../interfaces";
import styles from "./../../page.module.css";
import {
  formatDateShort,
  getAllRoutesStillCompeting,
  getCurrentAndSurroundingWeeks,
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
import { fetchBracketForWeek, fetchBracketsInRange } from "../server";
import Navigator from "../components/Navigator";
import SeeAllWeeks from "../components/SeeAllWeeks";
import FullPageMatch from "../components/FullPageMatch";
import About from "../components/About";

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
  const [isLoading, setIsLoading] = useState(props.initialMatches.length === 0);

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
      setIsLoading(false);
    }
  };

  // Effect to load initial data if not provided
  useEffect(() => {
    if (props.initialMatches.length === 0) {
      const loadInitialData = async () => {
        try {
          const weeks = getCurrentAndSurroundingWeeks();
          const matchesResponse = await fetchBracketsInRange(
            weeks[0],
            weeks[weeks.length - 1]
          );
          setStoredMatches(matchesToCacheFormat(matchesResponse.matches));
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load initial data:", error);
          setIsLoading(false);
        }
      };
      loadInitialData();
    }
  }, [props.initialMatches.length]);

  const routesToShowInHeader = isLoading
    ? []
    : selectedMatch
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
              {isLoading ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Loading matches...
                </div>
              ) : (
                <MatchesDashboard
                  matches={matchesInRoundToShow}
                  selectMatchId={setSelectedMatchId}
                />
              )}
            </div>
            <div className={styles.sectionHeaderOuterContainer}>
              <SectionHeader text={"Bracket"} />
            </div>
            <div className={styles.bracketOuterContainer}>
              {isLoading ? (
                <div
                  style={{
                    padding: "2rem",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Loading bracket...
                </div>
              ) : (
                <Bracket
                  matches={matchesForSelectedWeek}
                  selectedRound={selectedRound}
                  setSelectedMatch={setSelectedMatchId}
                  setSelectedRound={setSelectedRound}
                />
              )}
            </div>
            <div className={styles.weekSelectorOuterContainer}>
              <SeeAllWeeks callback={() => {}} />
            </div>
          </>
        )}
        {!selectedMatch && (
          <>
            <div className={styles.sectionHeaderOuterContainer}>
              <SectionHeader text={"About"} />
            </div>
            <div className={styles.aboutSectionContainer}>
              <About />
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
