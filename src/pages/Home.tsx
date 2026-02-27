import { Link } from "react-router-dom";
import { getDriverStandings, getConstructorStandings, getRaces } from "../lib/api";
import type { DriverStanding, ConstructorStanding, Race } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import { DriverStandingsTable, ConstructorStandingsTable } from "../components/StandingsTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const currentYear = new Date().getFullYear().toString();

function NextRaceCard({ races }: { races: Race[] }) {
  const now = new Date();
  const next = races.find((r) => new Date(`${r.date}T${r.time ?? "00:00:00Z"}`) > now);
  if (!next) return null;

  const raceDate = new Date(`${next.date}T${next.time ?? "00:00:00Z"}`);

  return (
    <Link
      to={`/season/${next.season}`}
      className="block rounded-xl border border-f1-border bg-f1-surface p-5 hover:border-f1-red/50 transition-colors"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-f1-red">Next Race</p>
      <h3 className="mt-1 text-lg font-bold">{next.raceName}</h3>
      <p className="mt-1 text-sm text-f1-text-muted">
        {next.Circuit.circuitName} &middot; {next.Circuit.Location.locality},{" "}
        {next.Circuit.Location.country}
      </p>
      <p className="mt-2 text-sm text-f1-text-muted">
        {raceDate.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </Link>
  );
}

export default function Home() {
  const { data: drivers, loading: dl, error: de } = useFetch<DriverStanding[]>(
    () => getDriverStandings(currentYear),
    [currentYear]
  );
  const { data: constructors, loading: cl, error: ce } = useFetch<ConstructorStanding[]>(
    () => getConstructorStandings(currentYear),
    [currentYear]
  );
  const { data: races, loading: rl, error: re } = useFetch<Race[]>(
    () => getRaces(currentYear),
    [currentYear]
  );

  const loading = dl || cl || rl;
  const error = de || ce || re;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-f1-red">F1</span> Wiki
        </h1>
        <p className="mt-1 text-f1-text-muted">
          {currentYear} Season
        </p>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && !error && (
        <div className="space-y-8">
          {races && <NextRaceCard races={races} />}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-f1-border bg-f1-surface p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold">Driver Standings</h2>
                <Link
                  to={`/season/${currentYear}`}
                  className="text-xs text-f1-red hover:underline"
                >
                  View all
                </Link>
              </div>
              {drivers && <DriverStandingsTable standings={drivers} compact />}
            </div>

            <div className="rounded-xl border border-f1-border bg-f1-surface p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold">Constructor Standings</h2>
                <Link
                  to={`/season/${currentYear}`}
                  className="text-xs text-f1-red hover:underline"
                >
                  View all
                </Link>
              </div>
              {constructors && (
                <ConstructorStandingsTable standings={constructors} compact />
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/seasons"
              className="rounded-xl border border-f1-border bg-f1-surface p-5 text-center hover:border-f1-red/50 transition-colors"
            >
              <p className="text-lg font-bold">All Seasons</p>
              <p className="text-sm text-f1-text-muted">1950 - {currentYear}</p>
            </Link>
            <Link
              to="/drivers"
              className="rounded-xl border border-f1-border bg-f1-surface p-5 text-center hover:border-f1-red/50 transition-colors"
            >
              <p className="text-lg font-bold">All Drivers</p>
              <p className="text-sm text-f1-text-muted">Browse the full driver database</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
