import { useParams, Link } from "react-router-dom";
import { getRaceResults } from "../lib/api";
import type { RaceWithResults } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Race() {
  const { year, round } = useParams<{ year: string; round: string }>();

  const { data: race, loading, error } = useFetch<RaceWithResults | null>(
    () => getRaceResults(year!, round!),
    [year, round]
  );

  return (
    <div>
      <div className="mb-1">
        <Link
          to={`/season/${year}`}
          className="text-sm text-f1-text-muted hover:text-f1-red transition-colors"
        >
          &larr; {year} Season
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && !error && race && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{race.raceName}</h1>
            <p className="text-f1-text-muted">
              {race.Circuit.circuitName} &middot; {race.Circuit.Location.locality},{" "}
              {race.Circuit.Location.country} &middot;{" "}
              {new Date(race.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-f1-border text-left text-f1-text-muted">
                  <th className="px-3 py-2 w-12">Pos</th>
                  <th className="px-3 py-2">Driver</th>
                  <th className="px-3 py-2 hidden sm:table-cell">Team</th>
                  <th className="px-3 py-2 text-right hidden sm:table-cell">Grid</th>
                  <th className="px-3 py-2 text-right hidden md:table-cell">Laps</th>
                  <th className="px-3 py-2 text-right">Time</th>
                  <th className="px-3 py-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {race.Results.map((r) => (
                  <tr
                    key={r.position}
                    className="border-b border-f1-border/50 hover:bg-f1-surface-hover transition-colors"
                  >
                    <td className="px-3 py-2 font-mono">
                      {r.positionText === "R" ? (
                        <span className="text-f1-red">RET</span>
                      ) : (
                        r.position
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        to={`/driver/${r.Driver.driverId}`}
                        className="hover:text-f1-red transition-colors"
                      >
                        {r.Driver.givenName} {r.Driver.familyName}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-f1-text-muted hidden sm:table-cell">
                      {r.Constructor.name}
                    </td>
                    <td className="px-3 py-2 text-right text-f1-text-muted hidden sm:table-cell">
                      {r.grid}
                    </td>
                    <td className="px-3 py-2 text-right text-f1-text-muted hidden md:table-cell">
                      {r.laps}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-f1-text-muted">
                      {r.Time?.time ?? r.status}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold">
                      {r.points !== "0" ? r.points : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loading && !error && !race && (
        <p className="text-f1-text-muted">No results available for this race yet.</p>
      )}
    </div>
  );
}
