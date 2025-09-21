import styles from "./../../page.module.css";

interface WeekSelectorProps {
  currentWeek: string;
  previousWeek?: string;
  nextWeek?: string;
  setCurrentWeek: (w: string) => void;
}

export default function WeekSelector(props: WeekSelectorProps) {
  return <div>Week selector placeholder</div>;
}
