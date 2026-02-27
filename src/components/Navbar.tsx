import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/seasons", label: "Seasons" },
  { to: "/drivers", label: "Drivers" },
];

export default function Navbar() {
  const { pathname } = useLocation();

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
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
