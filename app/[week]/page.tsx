import { Suspense } from "react";
import Bracket from "../src/components/Bracket";
import styles from "./../page.module.css";

interface WeekData {
  week: string;
  data: any;
}

async function fetchBracketForWeek(week: string): Promise<WeekData> {
  const res = await fetch(
    `https://ftri9w4qhh.execute-api.us-east-2.amazonaws.com/prod/matches?week_min=${week}&week_max=${week}`,
    {
      cache: "no-store", // or 'force-cache' for static generation
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return { week, data };
}

// Async component that fetches data
async function BracketData({ week }: { week: string }) {
  const { data } = await fetchBracketForWeek(week);
  return <Bracket matches={data["matches"]} />;
}

// Component that handles the resolved week parameter
function WeekContent({ week }: { week: string }) {
  return (
    <div>
      <h1>Week {week}</h1>
      <div className={styles.bracketContainer}>
        <Suspense fallback={<div>Fetching bracket matches...</div>}>
          <BracketData week={week} />
        </Suspense>
      </div>
    </div>
  );
}

// Main page component with async params
export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;

  return <WeekContent week={week} />;
}
