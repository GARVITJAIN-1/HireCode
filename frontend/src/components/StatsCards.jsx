import { ActivityIcon, RadioIcon, TrophyIcon, UsersIcon, ZapIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
      {/* ACTIVE SESSIONS CARD */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 shadow-xl group">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 group-hover:scale-110 transition-transform">
            <RadioIcon className="size-6 animate-pulse" />
          </div>
          <div className="badge badge-sm badge-success font-mono gap-1 text-[10px] py-1 px-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            LIVE P2P
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1">
          {activeSessionsCount}
        </div>
        <div className="text-xs font-mono text-base-content/60 flex items-center justify-between">
          <span>Active Interview Rooms</span>
          <span className="text-cyan-400">&bull; WebRTC</span>
        </div>
      </div>

      {/* TOTAL SESSIONS CARD */}
      <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl group">
        <div className="flex items-center justify-between mb-3">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
            <TrophyIcon className="size-6" />
          </div>
          <div className="badge badge-sm badge-primary font-mono text-[10px] py-1 px-2">
            SOLVED
          </div>
        </div>
        <div className="text-3xl sm:text-4xl font-black font-mono text-white mb-1">
          {recentSessionsCount}
        </div>
        <div className="text-xs font-mono text-base-content/60 flex items-center justify-between">
          <span>Your Past Interviews</span>
          <span className="text-purple-400">&bull; History</span>
        </div>
      </div>

      {/* SYSTEM TELEMETRY MINI BADGE */}
      <div className="sm:col-span-2 lg:col-span-1 glass-panel p-4 rounded-2xl border border-white/5 font-mono text-xs text-white/60 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-white/40 uppercase">
          <span className="flex items-center gap-1.5">
            <ActivityIcon className="size-3 text-emerald-400" />
            <span>Telemetry</span>
          </span>
          <span className="text-emerald-400 font-bold">14ms latency</span>
        </div>
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-400 via-primary to-emerald-400 h-full w-[94%] rounded-full animate-pulse" />
        </div>
        <div className="flex justify-between text-[10px] text-base-content/50">
          <span>Monaco Sync: Active</span>
          <span>Audio: Opus 48kHz</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;