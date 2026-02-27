import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getDrivers, getCurrentDriverIds } from "../lib/api";
import type { Driver } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import { CHAMPION_DRIVER_IDS } from "../lib/champions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PinButton from "../components/PinButton";
import DriverLabels from "../components/DriverLabels";

const PAGE_SIZE = 50;

type StatusFilter = "all" | "active" | "champion";

const selectClass =
  "rounded-lg border border-f1-border bg-f1-surface px-3 py-2 text-sm text-f1-text focus:border-f1-red focus:outline-none";

export default function Drivers() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [nationalityFilter, setNationalityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [decadeFilter, setDecadeFilter] = useState("");

  const { data, loading, error } = useFetch<{ drivers: Driver[]; total: number }>(
    () => getDrivers(PAGE_SIZE, offset),
    [offset]
  );

  const { data: activeIds } = useFetch<Set<string>>(getCurrentDriverIds);

  const nationalities = useMemo(() => {
    if (!data) return [];
    const set = new Set(data.drivers.map((d) => d.nationality));
    return [...set].sort();
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return null;
    return data.drivers.filter((d) => {
      if (search) {
        const q = search.toLowerCase();
        const matches =
          d.givenName.toLowerCase().includes(q) ||
          d.familyName.toLowerCase().includes(q) ||
          d.nationality.toLowerCase().includes(q) ||
          (d.code?.toLowerCase().includes(q) ?? false) ||
          (d.permanentNumber?.includes(q) ?? false);
        if (!matches) return false;
      }

      if (nationalityFilter && d.nationality !== nationalityFilter) return false;

      if (statusFilter === "active" && !activeIds?.has(d.driverId)) return false;
      if (statusFilter === "champion" && !CHAMPION_DRIVER_IDS.has(d.driverId)) return false;

      if (decadeFilter) {
        if (!d.dateOfBirth) return false;
        const birthYear = parseInt(d.dateOfBirth.slice(0, 4), 10);
        const decade = Math.floor(birthYear / 10) * 10;
        if (decade.toString() !== decadeFilter) return false;
      }

      return true;
    });
  }, [data, search, nationalityFilter, statusFilter, decadeFilter, activeIds]);

  const decades = useMemo(() => {
    if (!data) return [];
    const set = new Set(
      data.drivers
        .filter((d) => d.dateOfBirth)
        .map((d) => {
          const y = parseInt(d.dateOfBirth.slice(0, 4), 10);
          return (Math.floor(y / 10) * 10).toString();
        })
    );
    return [...set].sort();
  }, [data]);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  const hasActiveFilters = search || nationalityFilter || statusFilter !== "all" || decadeFilter;

  const clearFilters = () => {
    setSearch("");
    setNationalityFilter("");
    setStatusFilter("all");
    setDecadeFilter("");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Drivers</h1>

      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Search by name, code, or nationality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-f1-border bg-f1-surface px-4 py-2 text-sm text-f1-text placeholder:text-f1-text-muted focus:border-f1-red focus:outline-none"
        />

        <div className="flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className={selectClass}
          >
            <option value="all">All Status</option>
            <option value="active">Active Drivers</option>
            <option value="champion">World Champions</option>
          </select>

          <select
            value={nationalityFilter}
            onChange={(e) => setNationalityFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">All Nationalities</option>
            {nationalities.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>

          <select
            value={decadeFilter}
            onChange={(e) => setDecadeFilter(e.target.value)}
            className={selectClass}
          >
            <option value="">All Decades (DOB)</option>
            {decades.map((d) => (
              <option key={d} value={d}>
                {d}s
              </option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="rounded-lg border border-f1-border px-3 py-2 text-sm text-f1-text-muted hover:text-f1-red hover:border-f1-red/50 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && !error && filtered && (
        <>
          <p className="mb-3 text-xs text-f1-text-muted">
            Showing {filtered.length} of {PAGE_SIZE} loaded (page {currentPage})
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-f1-border text-left text-f1-text-muted">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2 hidden md:table-cell">Labels</th>
                  <th className="px-3 py-2">Nationality</th>
                  <th className="px-3 py-2 hidden sm:table-cell">DOB</th>
                  <th className="px-3 py-2 text-right hidden sm:table-cell">No.</th>
                  <th className="px-3 py-2 text-right w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-8 text-center text-f1-text-muted">
                      No drivers match the current filters.
                    </td>
                  </tr>
                )}
                {filtered.map((d) => (
                  <tr
                    key={d.driverId}
                    className="border-b border-f1-border/50 hover:bg-f1-surface-hover transition-colors"
                  >
                    <td className="px-3 py-2">
                      <Link
                        to={`/driver/${d.driverId}`}
                        className="hover:text-f1-red transition-colors"
                      >
                        {d.givenName} {d.familyName}
                      </Link>
                      {d.code && (
                        <span className="ml-1 text-f1-text-muted text-xs">
                          ({d.code})
                        </span>
                      )}
                      <span className="ml-2 inline md:hidden">
                        <DriverLabels
                          driverId={d.driverId}
                          isActive={activeIds?.has(d.driverId) ?? false}
                        />
                      </span>
                    </td>
                    <td className="px-3 py-2 hidden md:table-cell">
                      <DriverLabels
                        driverId={d.driverId}
                        isActive={activeIds?.has(d.driverId) ?? false}
                      />
                    </td>
                    <td className="px-3 py-2 text-f1-text-muted">{d.nationality}</td>
                    <td className="px-3 py-2 text-f1-text-muted hidden sm:table-cell">
                      {d.dateOfBirth}
                    </td>
                    <td className="px-3 py-2 text-right text-f1-text-muted hidden sm:table-cell">
                      {d.permanentNumber ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <PinButton
                        driver={{
                          driverId: d.driverId,
                          givenName: d.givenName,
                          familyName: d.familyName,
                          code: d.code,
                          nationality: d.nationality,
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
              disabled={offset === 0}
              className="rounded-lg border border-f1-border px-4 py-2 hover:bg-f1-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-f1-text-muted">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setOffset(offset + PAGE_SIZE)}
              disabled={data ? offset + PAGE_SIZE >= data.total : true}
              className="rounded-lg border border-f1-border px-4 py-2 hover:bg-f1-surface-hover disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
