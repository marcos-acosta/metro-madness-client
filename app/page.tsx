import { getCurrentAndSurroundingWeeks } from "./src/util";
import { fetchBracketsInRange } from "./src/server";
import HomepageLayout from "./src/layouts/HomepageLayout";

// Component that handles the resolved week parameter
export default async function Homepage() {
  const weeks = getCurrentAndSurroundingWeeks();
  const matchesResponse = await fetchBracketsInRange(
    weeks[0],
    weeks[weeks.length - 1]
  );

  return <HomepageLayout initialMatches={matchesResponse.matches} />;
}
