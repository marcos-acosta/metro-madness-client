import { Match } from "../interfaces";
import {
  combineClasses,
  getNextWeek,
  getPreviousWeek,
  matchesHaveWeek,
} from "../util";
import styles from "./../../page.module.css";

interface WeekSelectorProps {
  matches: Match[];
  selectedWeek: string;
  setSelectedWeek: (s: string) => void;
}

const maybeWrapInButton = (
  node: React.ReactElement,
  callback: () => void,
  wrap: boolean
) => {
  return wrap ? <button onClick={callback}>{node}</button> : node;
};

export default function WeekSelector(props: WeekSelectorProps) {
  const lastWeek = getPreviousWeek(props.selectedWeek);
  const nextWeek = getNextWeek(props.selectedWeek);
  const hasLastWeek = matchesHaveWeek(props.matches, lastWeek);
  const hasNextWeek = matchesHaveWeek(props.matches, nextWeek);

  return (
    <div className={styles.weekSelectorInnerContainer}>
      <div className={styles.weekSelectorContainer}>
        <div
          className={combineClasses(
            styles.weekSelectorButton,
            !hasLastWeek && styles.disabled
          )}
        >
          {maybeWrapInButton(
            <>← Last week</>,
            () => props.setSelectedWeek(lastWeek),
            hasLastWeek
          )}
        </div>
      </div>
      <div className={styles.weekSelectorContainer}>
        <div
          className={combineClasses(
            styles.weekSelectorButton,
            !hasNextWeek && styles.disabled
          )}
        >
          {maybeWrapInButton(
            <>Next week →</>,
            () => props.setSelectedWeek(nextWeek),
            hasNextWeek
          )}
        </div>
      </div>
    </div>
  );
}
