import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, PlusIcon, SparklesIcon, TerminalIcon, VideoIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
          {/* BACKGROUND GLOW */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* LEFT GREETING */}
            <div className="space-y-3">
              {/* TERMINAL PROMPT LINE */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60">
                <span className="text-cyan-400 font-bold">$</span>
                <span className="text-purple-300">usr@{user?.username || user?.firstName?.toLowerCase() || "dev"}</span>
                <span className="text-white/40">:~#</span>
                <span className="text-emerald-400">hirecode status --online</span>
                <span className="badge badge-xs badge-success gap-1 text-[9px] font-mono py-1 px-2">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  READY_TO_INTERVIEW
                </span>
              </div>

              {/* MAIN TITLE */}
              <div className="flex items-center gap-3">
                <div className="relative size-12 sm:size-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-primary to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-white/20">
                  <TerminalIcon className="size-6 sm:size-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black font-sans tracking-tight">
                    Welcome back, <span className="text-gradient-cyan">{user?.firstName || "Developer"}</span>!
                  </h1>
                  <p className="text-xs sm:text-sm text-base-content/60 font-mono mt-0.5">
                    Spin up a WebRTC interview room or solve algorithmic challenges together.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT ACTION BUTTONS */}
            <div className="flex items-center gap-3">
              <button
                onClick={onCreateSession}
                className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-primary to-purple-600 text-white font-mono font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-3 border border-white/20 cursor-pointer"
              >
                <div className="p-1 rounded-lg bg-white/20">
                  <PlusIcon className="size-4 text-white" />
                </div>
                <span>Create Live Session</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;