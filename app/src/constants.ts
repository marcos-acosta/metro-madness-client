import { RouteId, TrunkLine } from "./interfaces";

export const NUM_MATCHES = 21;

export const ROUND_NAMES = [
  "Round 1",
  "Round 2",
  "Quarterfinals",
  "Semifinals",
  "Championship",
];

export const FIRST_WEEK_DATE = "2025-09-15";

export const ROUTE_ID_TO_TRUNK_LINE = {
  [RouteId.ROUTE_1]: TrunkLine.SEVENTH_AVE,
  [RouteId.ROUTE_2]: TrunkLine.SEVENTH_AVE,
  [RouteId.ROUTE_3]: TrunkLine.SEVENTH_AVE,
  [RouteId.ROUTE_4]: TrunkLine.LEXINGTON,
  [RouteId.ROUTE_5]: TrunkLine.LEXINGTON,
  [RouteId.ROUTE_6]: TrunkLine.LEXINGTON,
  [RouteId.ROUTE_7]: TrunkLine.FLUSHING,
  [RouteId.ROUTE_A]: TrunkLine.EIGHTH_AVE,
  [RouteId.ROUTE_C]: TrunkLine.EIGHTH_AVE,
  [RouteId.ROUTE_E]: TrunkLine.EIGHTH_AVE,
  [RouteId.ROUTE_B]: TrunkLine.SIXTH_AVE,
  [RouteId.ROUTE_D]: TrunkLine.SIXTH_AVE,
  [RouteId.ROUTE_F]: TrunkLine.SIXTH_AVE,
  [RouteId.ROUTE_M]: TrunkLine.SIXTH_AVE,
  [RouteId.ROUTE_G]: TrunkLine.CROSSTOWN,
  [RouteId.ROUTE_L]: TrunkLine.CANARSIE,
  [RouteId.ROUTE_J]: TrunkLine.NASSAU,
  [RouteId.ROUTE_Z]: TrunkLine.NASSAU,
  [RouteId.ROUTE_N]: TrunkLine.BROADWAY,
  [RouteId.ROUTE_Q]: TrunkLine.BROADWAY,
  [RouteId.ROUTE_R]: TrunkLine.BROADWAY,
  [RouteId.ROUTE_W]: TrunkLine.BROADWAY,
};

export const COLORS = {
  [TrunkLine.SIXTH_AVE]: "#EB6800",
  [TrunkLine.SEVENTH_AVE]: "#D82233",
  [TrunkLine.EIGHTH_AVE]: "#0062CF",
  [TrunkLine.LEXINGTON]: "#009952",
  [TrunkLine.BROADWAY]: "#F6BC26",
  [TrunkLine.NASSAU]: "#8E5C33",
  [TrunkLine.CANARSIE]: "#7C858C",
  [TrunkLine.FLUSHING]: "#9A38A1",
  [TrunkLine.CROSSTOWN]: "#799534",
};
