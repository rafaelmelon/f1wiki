import { useState } from "react";
import { Link } from "react-router-dom";
import { getDrivers } from "../lib/api";
import type { Driver } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import PinButton from "../components/PinButton";

const PAGE_SIZE = 50;

export default function Drivers() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const { data, loading, error } = useFetch<{ drivers: Driver[]; total: number }>(
    () => getDrivers(PAGE_SIZE, offset),
    [offset]
  );

  const filtered = data?.drivers.filter((d) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      d.givenName.toLowerCase().includes(q) ||
      d.familyName.toLowerCase().includes(q) ||
      d.nationality.toLowerCase().includes(q)
    );
  });

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Drivers</h1>

      <input
        type="text"
        placeholder="Filter by name or nationality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-f1-border bg-f1-surface px-4 py-2 text-sm text-f1-text placeholder:text-f1-text-muted focus:border-f1-red focus:outline-none"
      />

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && !error && filtered && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-f1-border text-left text-f1-text-muted">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Nationality</th>
                  <th className="px-3 py-2 hidden sm:table-cell">DOB</th>
                  <th className="px-3 py-2 text-right hidden sm:table-cell">Number</th>
                  <th className="px-3 py-2 text-right w-24"></th>
                </tr>
              </thead>
              <tbody>
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
