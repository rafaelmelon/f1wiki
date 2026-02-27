import { useState } from "react";
import { isPinned, togglePin, type PinnedDriver } from "../lib/favorites";

export default function PinButton({
  driver,
  onToggle,
}: {
  driver: PinnedDriver;
  onToggle?: (pinned: boolean) => void;
}) {
  const [pinned, setPinned] = useState(() => isPinned(driver.driverId));

  const handleClick = () => {
    const nowPinned = togglePin(driver);
    setPinned(nowPinned);
    onToggle?.(nowPinned);
  };

  return (
    <button
      onClick={handleClick}
      title={pinned ? "Remove from comparison" : "Add to comparison"}
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors ${
        pinned
          ? "border-f1-red bg-f1-red/10 text-f1-red hover:bg-f1-red/20"
          : "border-f1-border text-f1-text-muted hover:border-f1-red/50 hover:text-f1-red"
      }`}
    >
      {pinned ? "★ Pinned" : "☆ Pin"}
    </button>
  );
}
