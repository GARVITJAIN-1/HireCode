import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, TerminalIcon, ZapIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-panel sticky top-0 z-50 border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
        >
          <div className="relative size-10 rounded-xl bg-linear-to-br from-cyan-500 via-primary to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <TerminalIcon className="size-5 text-white" />
            <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-400 rounded-full border-2 border-base-100 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xl font-mono tracking-wider text-gradient-cyan">
                HireCode
              </span>
              <span className="badge badge-xs badge-primary font-mono text-[10px] uppercase tracking-wider py-0.5 px-1.5">
                v2.0
              </span>
            </div>
            <span className="text-[11px] text-base-content/60 font-mono flex items-center gap-1 -mt-0.5">
              <span>pair_programming</span>
              <span className="cursor-blink text-cyan-400 font-bold">_</span>
            </span>
          </div>
        </Link>

        {/* SYSTEM STATUS PILL (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-base-100/60 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 shadow-inner">
          <span className="size-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span className="font-semibold">SYSTEMS NORMAL</span>
          <span className="opacity-40">|</span>
          <span className="text-base-content/60">WEBRTC P2P</span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PROBLEMS PAGE LINK */}
          <Link
            to="/problems"
            className={`px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              isActive("/problems")
                ? "bg-primary text-primary-content border-primary/80 shadow-lg shadow-primary/25"
                : "bg-base-100/40 border-white/5 text-base-content/70 hover:text-base-content hover:bg-base-200/60 hover:border-white/10"
            }`}
          >
            <BookOpenIcon className="size-4" />
            <span>Problems</span>
          </Link>

          {/* DASHBOARD PAGE LINK */}
          <Link
            to="/dashboard"
            className={`px-3.5 py-2 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 border ${
              isActive("/dashboard")
                ? "bg-primary text-primary-content border-primary/80 shadow-lg shadow-primary/25"
                : "bg-base-100/40 border-white/5 text-base-content/70 hover:text-base-content hover:bg-base-200/60 hover:border-white/10"
            }`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span>Dashboard</span>
          </Link>

          {/* USER CLERK BUTTON */}
          <div className="ml-2 pl-2 border-l border-white/10 flex items-center">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "size-9 ring-2 ring-primary/40 hover:ring-primary transition-all",
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;