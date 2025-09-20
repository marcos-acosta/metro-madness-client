import { RouteId } from "../interfaces";
import { combineClasses, getNameFromRouteId } from "../util";
import styles from "./../../page.module.css";
import ServiceBullet from "./ServiceBullet";

interface BracketMatchRouteProps {
  routeId?: RouteId;
  winner?: boolean;
  decided?: boolean;
}

export default function BracketMatchRoute(props: BracketMatchRouteProps) {
  return (
    <div className={combineClasses(styles.bracketRouteContainer)}>
      <div className={styles.bracketMatchBulletContainer}>
        {props.routeId ? <ServiceBullet routeId={props.routeId} /> : "?"}
      </div>
      <div className={styles.bracketMatchNameContainer}>
        {props.routeId ? getNameFromRouteId(props.routeId) : "TBD"}
      </div>
      {props.decided && !props.winner && <div className={styles.loserShader} />}
    </div>
  );
}
