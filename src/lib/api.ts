import type {
  Season,
  Race,
  RaceWithResults,
  DriverStanding,
  ConstructorStanding,
  Driver,
} from "./types";

const BASE = "https://api.jolpi.ca/ergast/f1";
const CACHE_TTL = 5 * 60 * 1000;
const REQUEST_DELAY = 300;

const cache = new Map<string, { data: unknown; ts: number }>();

let queue: Promise<void> = Promise.resolve();

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    queue = queue.then(async () => {
      await new Promise((r) => setTimeout(r, REQUEST_DELAY));
      try {
        resolve(await fn());
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function fetchApi<T>(path: string): Promise<T> {
  const cached = cache.get(path);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data as T;
  }

  const result = await enqueue(async () => {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    return json.MRData as T;
  });

  cache.set(path, { data: result, ts: Date.now() });
  return result;
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

export async function getCurrentDriverIds(): Promise<Set<string>> {
  const data = await fetchApi<{ DriverTable: { Drivers: Driver[] } }>(
    "/current/drivers.json"
  );
  return new Set(data.DriverTable.Drivers.map((d) => d.driverId));
}

export interface DriverStats {
  races: number;
  wins: number;
  podiums: number;
  seasons: number;
}

export async function getDriverStats(driverId: string): Promise<DriverStats> {
  const [racesData, winsData, p2Data, p3Data, seasonsData] = await Promise.all([
    fetchApi<{ total: string }>(`/drivers/${driverId}/results.json?limit=0`),
    fetchApi<{ total: string }>(`/drivers/${driverId}/results/1.json?limit=0`),
    fetchApi<{ total: string }>(`/drivers/${driverId}/results/2.json?limit=0`),
    fetchApi<{ total: string }>(`/drivers/${driverId}/results/3.json?limit=0`),
    fetchApi<{ SeasonTable: { Seasons: Season[] } }>(
      `/drivers/${driverId}/seasons.json`
    ),
  ]);

  const wins = parseInt(winsData.total, 10);
  const p2 = parseInt(p2Data.total, 10);
  const p3 = parseInt(p3Data.total, 10);

  return {
    races: parseInt(racesData.total, 10),
    wins,
    podiums: wins + p2 + p3,
    seasons: seasonsData.SeasonTable.Seasons.length,
  };
}
