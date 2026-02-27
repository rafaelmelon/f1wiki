import { getChampionRecord } from "../lib/champions";

interface DriverLabelsProps {
  driverId: string;
  isActive: boolean;
}

export default function DriverLabels({ driverId, isActive }: DriverLabelsProps) {
  const champion = getChampionRecord(driverId);

  return (
    <span className="inline-flex flex-wrap gap-1">
      {isActive && (
        <span className="rounded-full bg-emerald-900/50 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
          Active
        </span>
      )}
      {champion && (
        <span className="rounded-full bg-amber-900/50 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-800">
          {champion.titles}x WDC
        </span>
      )}
    </span>
  );
}
