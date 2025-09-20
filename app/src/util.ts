import { RouteId } from "./interfaces";

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
