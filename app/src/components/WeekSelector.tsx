import { RouteId } from "../interfaces";
import { combineClasses } from "../util";
import styles from "./../../page.module.css";
import ServiceBullet from "./ServiceBullet";

interface WeekSelectorProps {
  currentWeek: string;
  previousWeek?: string;
  nextWeek?: string;
  setCurrentWeek: (w: string) => void;
  routes: RouteId[];
}

export default function WeekSelector(props: WeekSelectorProps) {
  const numRows = props.routes.length > 4 ? 2 : 1;
  const numColumns = Math.ceil(props.routes.length / numRows);

  return (
    <div className={styles.weekSelectorOuterContainer}>
      <div className={styles.currentWeekContainer}>
        <div className={styles.currentWeekContainerLeftSide}>
          <div className={styles.weekNumberContainer}>Week 12</div>
          <div className={styles.weekRangeContainer}>
            <p>Sep 15 &ndash; Sep 19</p>
            <p>Mon to Fri, 5 PM to 8 PM</p>
          </div>
        </div>
        <div className={styles.currentWeekContainerRightSide}>
          <div
            className={combineClasses(
              styles.routesGrid,
              numRows === 2 && styles.twoRows
            )}
            style={{
              gridTemplateRows: `repeat(${numRows}, 1fr)`,
              gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
            }}
          >
            {props.routes.map((route) => (
              <div className={styles.hudServiceBulletContainer} key={route}>
                <ServiceBullet routeId={route} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
