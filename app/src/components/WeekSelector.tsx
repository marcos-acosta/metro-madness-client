import styles from "./../../page.module.css";

interface WeekSelectorProps {
  currentWeek: string;
  previousWeek?: string;
  nextWeek?: string;
  setCurrentWeek: (w: string) => void;
}

export default function WeekSelector(props: WeekSelectorProps) {
  return (
    <div className={styles.weekSelectorOuterContainer}>
      <div className={styles.currentWeekContainer}>
        <div className={styles.weekNumberContainer}>Week 12</div>
        <div className={styles.weekRangeContainer}>
          Sept 15, 2025 &mdash; Sept 19, 2025
        </div>
      </div>
    </div>
  );
}
