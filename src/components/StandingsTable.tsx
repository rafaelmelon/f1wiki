import { Link } from "react-router-dom";
import type { DriverStanding, ConstructorStanding } from "../lib/types";

export function DriverStandingsTable({
  standings,
  compact = false,
}: {
  standings: DriverStanding[];
  compact?: boolean;
}) {
  const items = compact ? standings.slice(0, 10) : standings;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-f1-border text-left text-f1-text-muted">
            <th className="px-3 py-2 w-12">#</th>
            <th className="px-3 py-2">Driver</th>
            {!compact && <th className="px-3 py-2">Team</th>}
            <th className="px-3 py-2 text-right">Pts</th>
            <th className="px-3 py-2 text-right">Wins</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr
              key={s.Driver.driverId}
              className="border-b border-f1-border/50 hover:bg-f1-surface-hover transition-colors"
            >
              <td className="px-3 py-2 text-f1-text-muted">{s.position}</td>
              <td className="px-3 py-2">
                <Link
                  to={`/driver/${s.Driver.driverId}`}
                  className="hover:text-f1-red transition-colors"
                >
                  {s.Driver.givenName} {s.Driver.familyName}
                </Link>
              </td>
              {!compact && (
                <td className="px-3 py-2 text-f1-text-muted">
                  {s.Constructors[0]?.name}
                </td>
              )}
              <td className="px-3 py-2 text-right font-semibold">{s.points}</td>
              <td className="px-3 py-2 text-right">{s.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConstructorStandingsTable({
  standings,
  compact = false,
}: {
  standings: ConstructorStanding[];
  compact?: boolean;
}) {
  const items = compact ? standings.slice(0, 5) : standings;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-f1-border text-left text-f1-text-muted">
            <th className="px-3 py-2 w-12">#</th>
            <th className="px-3 py-2">Constructor</th>
            <th className="px-3 py-2 text-right">Pts</th>
            <th className="px-3 py-2 text-right">Wins</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => (
            <tr
              key={s.Constructor.constructorId}
              className="border-b border-f1-border/50 hover:bg-f1-surface-hover transition-colors"
            >
              <td className="px-3 py-2 text-f1-text-muted">{s.position}</td>
              <td className="px-3 py-2">{s.Constructor.name}</td>
              <td className="px-3 py-2 text-right font-semibold">{s.points}</td>
              <td className="px-3 py-2 text-right">{s.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
