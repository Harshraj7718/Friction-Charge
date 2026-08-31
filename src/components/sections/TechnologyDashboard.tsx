"use client";

import { Wifi, BatteryCharging, Receipt, Activity } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const chargers = [
  { id: "FC-60 · Bay 01", status: "Charging", power: "58 kW", session: "00:24:12" },
  { id: "FC-120 · Bay 02", status: "Charging", power: "112 kW", session: "00:08:47" },
  { id: "FC-60 · Bay 03", status: "Available", power: "0 kW", session: "—" },
];

export default function TechnologyDashboard({ className }: { className?: string }) {
  return (
    <div className={cn("glass technical-border noise-overlay relative overflow-hidden rounded-3xl p-6 sm:p-8", className)}>
      <div className="flex items-center justify-between border-b border-card-border pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-bright-green shadow-[0_0_8px_rgba(69,245,140,0.9)]" />
          <p className="font-mono-tech text-xs tracking-widest text-muted">CHARGING MANAGEMENT PLATFORM</p>
        </div>
        <span className="font-mono-tech rounded-full border border-card-border px-2.5 py-1 text-[10px] text-muted">
          Illustrative interface
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-card/70 p-3">
          <Wifi size={16} className="text-bright-green" />
          <p className="font-mono-tech mt-2 text-lg font-medium">OCPP</p>
          <p className="text-[11px] text-muted">Connected</p>
        </div>
        <div className="rounded-xl bg-card/70 p-3">
          <Activity size={16} className="text-bright-green" />
          <p className="font-mono-tech mt-2 text-lg font-medium">Live</p>
          <p className="text-[11px] text-muted">Uptime monitoring</p>
        </div>
        <div className="rounded-xl bg-card/70 p-3">
          <Receipt size={16} className="text-bright-green" />
          <p className="font-mono-tech mt-2 text-lg font-medium">Auto</p>
          <p className="text-[11px] text-muted">Billing & payments</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {chargers.map((charger) => (
          <div key={charger.id} className="flex items-center justify-between rounded-xl bg-card/70 px-4 py-3">
            <div className="flex items-center gap-3">
              <BatteryCharging
                size={18}
                className={charger.status === "Charging" ? "text-bright-green" : "text-muted"}
              />
              <div>
                <p className="font-mono-tech text-xs text-text">{charger.id}</p>
                <p className="text-[11px] text-muted">{charger.status}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono-tech text-sm text-bright-green">{charger.power}</p>
              <p className="font-mono-tech text-[10px] text-muted">{charger.session}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 h-16 w-full">
        <svg viewBox="0 0 300 60" className="h-full w-full" preserveAspectRatio="none">
          <polyline
            points="0,45 30,40 60,42 90,20 120,28 150,15 180,22 210,10 240,18 270,8 300,14"
            fill="none"
            stroke="#45f58c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-mono-tech mt-1 text-[10px] text-muted">Energy delivered · illustrative trend</p>
      </div>
    </div>
  );
}
