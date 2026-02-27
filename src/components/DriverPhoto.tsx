import { useState, useEffect } from "react";
import { getDriverImageUrl } from "../lib/wikipedia";

interface DriverPhotoProps {
  wikipediaUrl: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

export default function DriverPhoto({
  wikipediaUrl,
  name,
  size = "md",
}: DriverPhotoProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getDriverImageUrl(wikipediaUrl).then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [wikipediaUrl]);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={`${sizeClasses[size]} shrink-0 overflow-hidden rounded-full border border-f1-border bg-f1-surface`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setSrc(null)}
          className={`h-full w-full object-cover transition-opacity ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-bold text-f1-text-muted">
          {initials}
        </div>
      )}
    </div>
  );
}
