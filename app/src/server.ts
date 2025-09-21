"use server";

import { GetMatchesResponse } from "./interfaces";

export async function fetchBracketForWeek(
  week: string
): Promise<GetMatchesResponse> {
  const res = await fetch(
    `https://ftri9w4qhh.execute-api.us-east-2.amazonaws.com/prod/matches?week_min=${week}&week_max=${week}`,
    {
      cache: "no-store", // or 'force-cache' for static generation
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

export async function fetchBracketsInRange(
  weekMin: string,
  weekMax: string
): Promise<GetMatchesResponse> {
  const res = await fetch(
    `https://ftri9w4qhh.execute-api.us-east-2.amazonaws.com/prod/matches?week_min=${weekMin}&week_max=${weekMax}`,
    {
      cache: "no-store", // or 'force-cache' for static generation
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
