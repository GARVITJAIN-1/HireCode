import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
  RadioIcon,
  TerminalIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col justify-between h-full">
      <div>
        {/* HEADER SECTION */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          {/* TITLE AND ICON */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-primary rounded-xl text-white shadow-lg shadow-cyan-500/20">
              <RadioIcon className="size-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
                Live Coding Rooms
              </h2>
              <p className="text-xs font-mono text-base-content/50">
                P2P WebRTC channels ready for peer joining
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="size-2 bg-emerald-400 rounded-full animate-ping" />
            <span className="text-xs font-mono font-semibold text-emerald-400">
              {sessions.length} ACTIVE
            </span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <LoaderIcon className="size-10 animate-spin text-cyan-400 mb-3" />
              <span className="text-xs font-mono text-white/50">Loading active rooms...</span>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session) => {
              const inSession = isUserInSession(session);
              const isFull = session.participant && !inSession;

              return (
                <div
                  key={session._id}
                  className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* LEFT INFO */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="relative size-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform shrink-0">
                        <Code2Icon className="size-6" />
                        <span className="absolute -top-1 -right-1 size-3 bg-emerald-400 rounded-full border-2 border-[#0d121f]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold font-mono text-base text-white truncate max-w-[220px] sm:max-w-xs">
                            {session.problem}
                          </h3>
                          <span
                            className={`badge badge-xs font-mono uppercase tracking-wider py-1 px-2 ${getDifficultyBadgeClass(
                              session.difficulty
                            )}`}
                          >
                            {session.difficulty}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-base-content/60">
                          <div className="flex items-center gap-1.5 text-white/70">
                            <CrownIcon className="size-3.5 text-amber-400" />
                            <span className="truncate max-w-[120px]">
                              {session.host?.name || "Host"}
                            </span>
                          </div>

                          <span className="opacity-30">&bull;</span>

                          <div className="flex items-center gap-1">
                            <UsersIcon className="size-3.5" />
                            <span>{session.participant ? "2/2 PEERS" : "1/2 PEER"}</span>
                          </div>

                          {isFull ? (
                            <span className="badge badge-error badge-xs font-mono text-[9px] py-0.5">
                              ROOM FULL
                            </span>
                          ) : (
                            <span className="badge badge-success badge-xs font-mono text-[9px] py-0.5">
                              OPEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT CTA BUTTON */}
                    <div className="sm:shrink-0 flex justify-end">
                      {isFull ? (
                        <button className="btn btn-disabled btn-sm font-mono text-xs opacity-50 px-4 rounded-xl">
                          Full
                        </button>
                      ) : (
                        <Link
                          to={`/session/${session._id}`}
                          className={`btn btn-sm font-mono text-xs rounded-xl gap-2 px-5 transition-all shadow-md ${
                            inSession
                              ? "bg-purple-600 hover:bg-purple-500 text-white border-none shadow-purple-500/25"
                              : "bg-cyan-500 hover:bg-cyan-400 text-black font-bold border-none shadow-cyan-500/25"
                          }`}
                        >
                          <span>{inSession ? "Rejoin Room" : "Join Room"}</span>
                          <ArrowRightIcon className="size-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-14 px-4 glass-panel rounded-2xl border border-white/5">
              <div className="size-16 mx-auto mb-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 animate-float">
                <TerminalIcon className="size-8" />
              </div>
              <p className="text-base font-bold font-mono text-white mb-1">
                No active interview rooms right now
              </p>
              <p className="text-xs font-mono text-base-content/50 max-w-sm mx-auto">
                Be the first engineer to spin up a room and invite a peer to pair program.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;