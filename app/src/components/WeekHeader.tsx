import { RouteId } from "../interfaces";
import {
  combineClasses,
  formatDateShort,
  formatDatestringShort,
  getLastMatchDayInBracket,
  getWeekNumber,
} from "../util";
import styles from "./../../page.module.css";
import ServiceBullet from "./ServiceBullet";

interface WeekSelectorProps {
  routes: RouteId[];
  weekStringDate: string;
}

export default function WeekHeader(props: WeekSelectorProps) {
  const numRows = props.routes.length > 4 ? 2 : 1;
  const numColumns = Math.ceil(props.routes.length / numRows);
  const weekNumber = getWeekNumber(props.weekStringDate);
  const firstDayFormatted = formatDatestringShort(props.weekStringDate);
  const lastDayFormatted = formatDateShort(
    getLastMatchDayInBracket(props.weekStringDate)
  );

  return (
    <div className={styles.weekHeaderOuterContainer}>
      <div className={styles.currentWeekContainer}>
        <div className={styles.currentWeekContainerLeftSide}>
          <div className={styles.weekNumberContainer}>Week {weekNumber}</div>
          <div className={styles.weekRangeContainer}>
            <p>
              {firstDayFormatted} &ndash; {lastDayFormatted}
            </p>
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
