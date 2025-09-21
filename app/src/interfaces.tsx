export enum RouteId {
  ROUTE_A = "A",
  ROUTE_C = "C",
  ROUTE_E = "E",
  ROUTE_B = "B",
  ROUTE_D = "D",
  ROUTE_F = "F",
  ROUTE_M = "M",
  ROUTE_G = "G",
  ROUTE_L = "L",
  ROUTE_J = "J",
  ROUTE_Z = "Z",
  ROUTE_N = "N",
  ROUTE_Q = "Q",
  ROUTE_R = "R",
  ROUTE_W = "W",
  ROUTE_1 = "1",
  ROUTE_2 = "2",
  ROUTE_3 = "3",
  ROUTE_4 = "4",
  ROUTE_5 = "5",
  ROUTE_6 = "6",
  ROUTE_7 = "7",
}

export enum MatchStatus {
  NOT_YET_STARTED = "NOT_YET_STARTED",
  ONGOING = "ONGOING",
  ENDED = "ENDED",
}

export enum VictoryType {
  COIN_TOSS_BOTH_DQ = "COIN_TOSS_BOTH_DQ",
  COIN_TOSS_SAME_DELAY = "COIN_TOSS_SAME_DELAY",
  ONE_DQ = "ONE_DQ",
  FAIR_AND_SQUARE = "FAIR_AND_SQUARE",
}

export enum TripStatus {
  NOT_ASSIGNED = "NOT_ASSIGNED",
  ONGOING = "ONGOING",
  DQ_NEVER_ASSIGNED = "DQ_NEVER_ASSIGNED",
  DQ_TOOK_TOO_LONG = "DQ_TOOK_TOO_LONG",
  DQ_DISAPPEARED = "DQ_DISAPPEARED",
  DQ_NO_COMPETITOR = "DQ_NO_COMPETITOR",
  FINISHED = "FINISHED",
}

export interface MatchResult {
  winner: RouteId;
  victoryType: VictoryType;
}

export interface Stop {
  stopId: string;
  stopName: string;
  predictedTimeSeconds: number;
  actualTimeSeconds?: number;
  delay?: number;
}

export interface TripData {
  routeId?: RouteId;
  winnerMatchId?: string;
  tripStatus?: TripStatus;
  tripId?: string;
  stops?: Stop[];
  finalDelay?: number;
}

export interface MatchData {
  date: string;
  matchStatus: MatchStatus;
  matchResult?: MatchResult;
  competingTrips: TripData[];
  numStopsToFinish?: number;
}

export interface Match {
  bracketId: string;
  matchId: string;
  matchData: MatchData;
}

export interface GetMatchesResponse {
  matches: Match[];
}
