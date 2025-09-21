import {
  COLORS,
  FIRST_WEEK_DATE,
  NUM_MATCHES,
  ROUTE_ID_TO_TRUNK_LINE,
} from "./constants";
import { Match, MatchData, RouteId, TripData } from "./interfaces";
import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export const combineClasses = (
  ...classnames: (string | undefined | false | null)[]
) => classnames.filter(Boolean).join(" ");

export const getPathFromRouteId = (routeId: RouteId) => {
  return `/service-bullets/NYCS-bull-trans-${routeId}-Std.svg`;
};

export const getNameFromRouteId = (routeId: RouteId) => {
  switch (routeId) {
    case RouteId.ROUTE_1:
      return "Seventh Ave 1";
    case RouteId.ROUTE_2:
      return "Seventh Ave 2";
    case RouteId.ROUTE_3:
      return "Seventh Ave 3";
    case RouteId.ROUTE_4:
      return "Lexington Ave 4";
    case RouteId.ROUTE_5:
      return "Lexington Ave 5";
    case RouteId.ROUTE_6:
      return "Lexington Ave 6";
    case RouteId.ROUTE_7:
      return "Flushing 7";
    case RouteId.ROUTE_A:
      return "Eighth Ave A";
    case RouteId.ROUTE_B:
      return "Sixth Ave B";
    case RouteId.ROUTE_C:
      return "Eighth Ave C";
    case RouteId.ROUTE_D:
      return "Sixth Ave D";
    case RouteId.ROUTE_E:
      return "Eighth Ave E";
    case RouteId.ROUTE_F:
      return "Sixth Ave F";
    case RouteId.ROUTE_G:
      return "Crosstown G";
    case RouteId.ROUTE_J:
      return "Nassau Street J";
    case RouteId.ROUTE_L:
      return "14th St–Canarsie L";
    case RouteId.ROUTE_M:
      return "Sixth Ave M";
    case RouteId.ROUTE_N:
      return "Broadway N";
    case RouteId.ROUTE_Q:
      return "Broadway Q";
    case RouteId.ROUTE_R:
      return "Broadway R";
    case RouteId.ROUTE_W:
      return "Broadway W";
    case RouteId.ROUTE_Z:
      return "Nassau Street Z";
    default:
      return "Unknown route";
  }
};

export const getTodayDateEST = () => {
  const now = new Date();
  const nycTime = toZonedTime(now, "America/New_York");
  return startOfDay(nycTime);
};

export const dateToDatestring = (d: Date) => {
  return d.toLocaleDateString("en-CA", {
    timeZone: "America/New_York",
  });
};

export const datestringToDate = (ds: string) => {
  const localDate = parseISO(ds + "T00:00:00");
  return fromZonedTime(localDate, "America/New_York");
};

export const getCurrentWeek = () => {
  const nycDate = getTodayDateEST();

  const dayOfWeek = nycDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const daysBack = dayOfWeek === 1 ? 0 : dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const latestMonday = new Date(nycDate);
  latestMonday.setDate(nycDate.getDate() - daysBack);

  return dateToDatestring(latestMonday);
};

export const getCurrentAndSurroundingWeeks = () => {
  const currentWeek = getCurrentWeek();
  return [getPreviousWeek(currentWeek), currentWeek, getNextWeek(currentWeek)];
};

export const getPreviousWeek = (weekDate: string) => {
  return addDaysToDate(weekDate, -7);
};

export const getNextWeek = (weekDate: string) => {
  return addDaysToDate(weekDate, 7);
};

export const addDaysToDate = (dateString: string, nDays: number) => {
  const date = datestringToDate(dateString);

  // Add/subtract days
  date.setDate(date.getDate() + nDays);

  // Format back to YYYY-MM-DD in NYC timezone
  return dateToDatestring(date);
};

export const isSunday = () => {
  const nycDate = getTodayDateEST();
  return nycDate.getDay() === 0;
};

const getLosingRoute = (matchData: MatchData): RouteId | undefined => {
  if (matchData.matchResult) {
    const winner = matchData.matchResult.winner;
    return matchData.competingTrips.find(
      (trip) => trip.routeId && trip.routeId !== winner
    )?.routeId;
  }
};

export const getAllRoutesStillCompeting = (matches: Match[]): RouteId[] => {
  const losers = new Set(
    matches.map((match) => getLosingRoute(match.matchData)).flat() as RouteId[]
  );
  const allRoutes = new Set(Object.values(RouteId));
  return Array.from(allRoutes.difference(losers));
};

export const isBracketFinished = (matches: Match[]): boolean =>
  Boolean(
    matches.find((match) => match.matchId === `${NUM_MATCHES}`)?.matchData
      .matchResult
  );

export const getRoundToShowForWeek = (weekString: string): number => {
  const todayDateEst = getTodayDateEST();
  const firstDayOfWeekEst = datestringToDate(weekString);
  const daysAfterFirstDayOfWeek = differenceInCalendarDays(
    todayDateEst,
    firstDayOfWeekEst
  );
  return Math.min(Math.max(daysAfterFirstDayOfWeek, 0), 4);
};

export const getWeekNumber = (weekString: string): number => {
  const weekStringDate = datestringToDate(weekString);
  const firstWeekStringDate = datestringToDate(FIRST_WEEK_DATE);
  const daysAfterFirstDayOfWeek = differenceInCalendarDays(
    weekStringDate,
    firstWeekStringDate
  );
  return Math.max(Math.floor(daysAfterFirstDayOfWeek / 7), 0) + 1;
};

export const getLastMatchDayInBracket = (weekString: string): Date => {
  return datestringToDate(addDaysToDate(weekString, 4));
};

export const formatDateShort = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
  }).format(date);
};

export const formatDatestringShort = (ds: string) => {
  return formatDateShort(datestringToDate(ds));
};

export const matchesHaveWeek = (matches: Match[], weekString: string) =>
  matches.some((match) => match.bracketId === weekString);

export const matchIdToRoundNumber = (matchId: string) => {
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

export const getMatchesInRound = (matches: Match[], round: number) =>
  matches.filter((match) => matchIdToRoundNumber(match.matchId) === round);

export const getColorFromRouteId = (routeId: RouteId) =>
  COLORS[ROUTE_ID_TO_TRUNK_LINE[routeId]];

export const hasBothCompetitors = (match: Match) =>
  match.matchData.competingTrips.find((trip) => trip.routeId === undefined) ===
  undefined;

export const formatDelay = (delaySeconds: number) => {
  const delaySecondsAbs = Math.abs(delaySeconds);
  let seconds;
  let minutes;
  if (delaySecondsAbs < 60) {
    minutes = 0;
    seconds = delaySecondsAbs;
  } else {
    minutes = Math.floor(delaySecondsAbs / 60);
    seconds = delaySecondsAbs % 60;
  }
  const secondsFormatted = `${seconds}`.padStart(2, "0");
  return `${minutes}m${secondsFormatted}s`;
};

export const getLatestDelayTime = (trip: TripData) =>
  trip.stops
    ? trip.stops.toReversed().find((stop) => stop.delay !== undefined)?.delay
    : undefined;
