import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getPinnedDrivers } from "../lib/favorites";

const links = [
  { to: "/", label: "Home" },
  { to: "/seasons", label: "Seasons" },
  { to: "/drivers", label: "Drivers" },
  { to: "/compare", label: "Compare" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [pinnedCount, setPinnedCount] = useState(0);

  useEffect(() => {
    const update = () => setPinnedCount(getPinnedDrivers().length);
    update();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "f1wiki_pinned_drivers") update();
    };
    window.addEventListener("storage", handleStorage);

    const interval = setInterval(update, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-f1-border bg-f1-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold tracking-tight">
          <span className="text-f1-red">F1</span> Wiki
        </Link>
        <div className="flex gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === to ? "text-white" : "text-f1-text-muted"
              }`}
            >
              {label}
              {to === "/compare" && pinnedCount > 0 && (
                <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-f1-red px-1 text-[10px] font-bold text-white">
                  {pinnedCount}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
