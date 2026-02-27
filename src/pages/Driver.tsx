import { useParams, Link } from "react-router-dom";
import { getDriver, getDriverSeasons } from "../lib/api";
import type { Driver as DriverType, Season } from "../lib/types";
import { useFetch } from "../lib/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Driver() {
  const { driverId } = useParams<{ driverId: string }>();

  const { data: driver, loading: dl, error: de } = useFetch<DriverType | null>(
    () => getDriver(driverId!),
    [driverId]
  );
  const { data: seasons, loading: sl, error: se } = useFetch<Season[]>(
    () => getDriverSeasons(driverId!),
    [driverId]
  );

  const loading = dl || sl;
  const error = de || se;

  return (
    <div>
      <div className="mb-1">
        <Link
          to="/drivers"
          className="text-sm text-f1-text-muted hover:text-f1-red transition-colors"
        >
          &larr; All Drivers
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      {!loading && !error && driver && (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              {driver.givenName} {driver.familyName}
            </h1>
            <div className="mt-2 flex flex-wrap gap-3 text-sm text-f1-text-muted">
              <span>{driver.nationality}</span>
              <span>&middot;</span>
              <span>Born {driver.dateOfBirth}</span>
              {driver.permanentNumber && (
                <>
                  <span>&middot;</span>
                  <span>#{driver.permanentNumber}</span>
                </>
              )}
              {driver.code && (
                <>
                  <span>&middot;</span>
                  <span>{driver.code}</span>
                </>
              )}
            </div>
            <a
              href={driver.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-f1-red hover:underline"
            >
              Wikipedia &rarr;
            </a>
          </div>

          {seasons && seasons.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold">
                Seasons ({seasons.length})
              </h2>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                {[...seasons].reverse().map((s) => (
                  <Link
                    key={s.season}
                    to={`/season/${s.season}`}
                    className="rounded-lg border border-f1-border bg-f1-surface px-2 py-3 text-center font-mono text-sm hover:border-f1-red/50 hover:bg-f1-surface-hover transition-colors"
                  >
                    {s.season}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {!loading && !error && !driver && (
        <p className="text-f1-text-muted">Driver not found.</p>
      )}
    </div>
  );
}
