import { Code2, Clock, Users, Trophy, Loader, CheckCircle2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mt-8 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
            <Clock className="size-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-sans text-white tracking-tight">
              Session Archive
            </h2>
            <p className="text-xs font-mono text-base-content/50">
              Completed pair programming & interview history
            </p>
          </div>
        </div>

        <span className="badge badge-sm badge-outline font-mono text-[11px] py-1 px-3">
          {sessions.length} RECORDED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <Loader className="size-8 animate-spin text-purple-400 mb-3" />
            <span className="text-xs font-mono text-white/50">Fetching archive records...</span>
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="size-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Code2 className="size-5" />
                  </div>
                  <span
                    className={`badge badge-xs font-mono uppercase tracking-wider py-1 px-2 ${getDifficultyBadgeClass(
                      session.difficulty
                    )}`}
                  >
                    {session.difficulty}
                  </span>
                </div>

                <h3 className="font-bold font-mono text-base text-white truncate mb-1">
                  {session.problem}
                </h3>

                <div className="space-y-1.5 text-xs font-mono text-base-content/60 mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Host:</span>
                    <span className="text-white/80 font-medium truncate max-w-[140px]">
                      {session.host?.name || "Anonymous"}
                    </span>
                  </div>
                  {session.participant && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/40">Candidate:</span>
                      <span className="text-white/80 font-medium truncate max-w-[140px]">
                        {session.participant?.name || "Peer"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-base-content/50">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2Icon className="size-3.5" />
                  <span>Finished</span>
                </span>
                <span>
                  {session.createdAt
                    ? formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })
                    : "Recently"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 px-4 glass-panel rounded-2xl border border-white/5">
            <Trophy className="size-12 mx-auto mb-2 text-white/20" />
            <p className="text-sm font-mono text-white/70 mb-1">No completed sessions yet</p>
            <p className="text-xs font-mono text-white/40">
              Your interview history and problem stats will show up here after finishing rooms.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;