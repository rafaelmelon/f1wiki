import type {
  Season,
  Race,
  RaceWithResults,
  DriverStanding,
  ConstructorStanding,
  Driver,
} from "./types";

const BASE = "https://api.jolpi.ca/ergast/f1";

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const json = await res.json();
  return json.MRData as T;
}

export async function getSeasons(): Promise<Season[]> {
  const data = await fetchApi<{ SeasonTable: { Seasons: Season[] } }>(
    "/seasons.json?limit=100&offset=0"
  );
  const more = await fetchApi<{ SeasonTable: { Seasons: Season[] } }>(
    "/seasons.json?limit=100&offset=100"
  );
  return [...data.SeasonTable.Seasons, ...more.SeasonTable.Seasons];
}

export async function getRaces(year: string): Promise<Race[]> {
  const data = await fetchApi<{ RaceTable: { Races: Race[] } }>(
    `/${year}.json`
  );
  return data.RaceTable.Races;
}

export async function getRaceResults(
  year: string,
  round: string
): Promise<RaceWithResults | null> {
  const data = await fetchApi<{ RaceTable: { Races: RaceWithResults[] } }>(
    `/${year}/${round}/results.json`
  );
  return data.RaceTable.Races[0] ?? null;
}

export async function getDriverStandings(
  year: string
): Promise<DriverStanding[]> {
  const data = await fetchApi<{
    StandingsTable: {
      StandingsLists: { DriverStandings: DriverStanding[] }[];
    };
  }>(`/${year}/driverStandings.json`);
  return data.StandingsTable.StandingsLists[0]?.DriverStandings ?? [];
}

export async function getConstructorStandings(
  year: string
): Promise<ConstructorStanding[]> {
  const data = await fetchApi<{
    StandingsTable: {
      StandingsLists: {
        ConstructorStandings: ConstructorStanding[];
      }[];
    };
  }>(`/${year}/constructorStandings.json`);
  return data.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? [];
}

export async function getDrivers(
  limit = 50,
  offset = 0
): Promise<{ drivers: Driver[]; total: number }> {
  const data = await fetchApi<{
    total: string;
    DriverTable: { Drivers: Driver[] };
  }>(`/drivers.json?limit=${limit}&offset=${offset}`);
  return {
    drivers: data.DriverTable.Drivers,
    total: parseInt(data.total, 10),
  };
}

export async function getDriver(driverId: string): Promise<Driver | null> {
  const data = await fetchApi<{ DriverTable: { Drivers: Driver[] } }>(
    `/drivers/${driverId}.json`
  );
  return data.DriverTable.Drivers[0] ?? null;
}

export async function getDriverSeasons(driverId: string): Promise<Season[]> {
  const data = await fetchApi<{ SeasonTable: { Seasons: Season[] } }>(
    `/drivers/${driverId}/seasons.json`
  );
  return data.SeasonTable.Seasons;
}
