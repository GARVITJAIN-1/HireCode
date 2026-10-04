import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import {
  fetchCodeforcesProblems,
  ratingToDifficulty,
  problemUrl,
} from "../lib/codeforces";
import {
  ChevronRightIcon,
  Code2Icon,
  SearchIcon,
  TerminalIcon,
  ZapIcon,
  FilterIcon,
  CheckCircle2Icon,
  GlobeIcon,
  LoaderIcon,
  ExternalLinkIcon,
  TagIcon,
  ChevronLeftIcon,
  DatabaseIcon,
  RefreshCwIcon,
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

const ITEMS_PER_PAGE = 20;

function ProblemsPage() {
  // ─── Source Tab ─────────────────────────────────────────────────
  const [source, setSource] = useState("local"); // "local" | "codeforces"

  // ─── Local problems state ──────────────────────────────────────
  const allLocalProblems = Object.values(PROBLEMS);

  // ─── Codeforces state ──────────────────────────────────────────
  const [cfProblems, setCfProblems] = useState([]);
  const [cfLoading, setCfLoading] = useState(false);
  const [cfError, setCfError] = useState(null);
  const [cfFetched, setCfFetched] = useState(false);

  // ─── Shared filters ───────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [page, setPage] = useState(1);

  // Reset page when filters or source change
  useEffect(() => setPage(1), [searchTerm, selectedDifficulty, selectedTag, source]);

  // ─── Fetch Codeforces on first tab switch ─────────────────────
  useEffect(() => {
    if (source !== "codeforces" || cfFetched) return;
    loadCfProblems();
  }, [source]);

  const loadCfProblems = async () => {
    setCfLoading(true);
    setCfError(null);
    try {
      const data = await fetchCodeforcesProblems();
      // Build a solved-count map from problemStatistics
      const solvedMap = {};
      data.problemStatistics.forEach((s) => {
        solvedMap[`${s.contestId}-${s.index}`] = s.solvedCount;
      });
      // Enrich problems with solvedCount
      const enriched = data.problems.map((p) => ({
        ...p,
        solvedCount: solvedMap[`${p.contestId}-${p.index}`] || 0,
        difficulty: ratingToDifficulty(p.rating),
      }));
      setCfProblems(enriched);
      setCfFetched(true);
    } catch (err) {
      setCfError(err.message);
    } finally {
      setCfLoading(false);
    }
  };

  // ─── Collect unique CF tags ────────────────────────────────────
  const cfTags = useMemo(() => {
    const tagSet = new Set();
    cfProblems.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [cfProblems]);

  // ─── Filter helpers ────────────────────────────────────────────
  const filterLocal = () =>
    allLocalProblems.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.description?.text && p.description.text.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty =
        selectedDifficulty === "all" || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      return matchesSearch && matchesDifficulty;
    });

  const filterCF = () =>
    cfProblems.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDifficulty =
        selectedDifficulty === "all" || p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesTag = selectedTag === "all" || p.tags?.includes(selectedTag);
      return matchesSearch && matchesDifficulty && matchesTag;
    });

  const localFiltered = filterLocal();
  const cfFiltered = filterCF();

  const isLocal = source === "local";
  const currentList = isLocal ? localFiltered : cfFiltered;
  const totalPages = Math.max(1, Math.ceil(currentList.length / ITEMS_PER_PAGE));
  const paginated = currentList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // ─── Counts ────────────────────────────────────────────────────
  const easyCount = (isLocal ? allLocalProblems : cfProblems).filter((p) => p.difficulty === "Easy").length;
  const mediumCount = (isLocal ? allLocalProblems : cfProblems).filter((p) => p.difficulty === "Medium").length;
  const hardCount = (isLocal ? allLocalProblems : cfProblems).filter((p) => p.difficulty === "Hard").length;
  const totalCount = isLocal ? allLocalProblems.length : cfProblems.length;

  return (
    <div className="min-h-screen bg-[#070a12] text-base-content relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* AMBIENT BACKGROUND GLOW & CYBER GRID */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[600px] h-[400px] bg-gradient-to-bl from-cyan-600/15 via-purple-600/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <TerminalIcon className="size-4" />
              <span>// ALGORITHMIC_CHALLENGE_VAULT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white">
              Practice <span className="text-gradient-cyan">Problems</span>
            </h1>
            <p className="text-xs sm:text-sm text-base-content/60 font-mono mt-1">
              {isLocal
                ? "Curated data structures and algorithms challenges with live test execution"
                : "Thousands of competitive programming problems from Codeforces"}
            </p>
          </div>

          {/* TELEMETRY METRIC PILLS */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
            <div className="glass-panel px-3.5 py-2 rounded-xl border border-white/10 text-center">
              <span className="text-white/50 block text-[10px]">TOTAL</span>
              <span className="text-white font-bold text-sm">{totalCount}</span>
            </div>
            <div className="glass-panel px-3.5 py-2 rounded-xl border border-emerald-500/20 text-center">
              <span className="text-emerald-400/70 block text-[10px]">EASY</span>
              <span className="text-emerald-400 font-bold text-sm">{easyCount}</span>
            </div>
            <div className="glass-panel px-3.5 py-2 rounded-xl border border-amber-500/20 text-center">
              <span className="text-amber-400/70 block text-[10px]">MEDIUM</span>
              <span className="text-amber-400 font-bold text-sm">{mediumCount}</span>
            </div>
            <div className="glass-panel px-3.5 py-2 rounded-xl border border-rose-500/20 text-center">
              <span className="text-rose-400/70 block text-[10px]">HARD</span>
              <span className="text-rose-400 font-bold text-sm">{hardCount}</span>
            </div>
          </div>
        </div>

        {/* SOURCE TABS: LOCAL vs CODEFORCES */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSource("local")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              isLocal
                ? "bg-gradient-to-r from-cyan-500 to-primary text-black font-bold shadow-lg shadow-cyan-500/25"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            }`}
          >
            <DatabaseIcon className="size-3.5" />
            <span>HireCode ({allLocalProblems.length})</span>
          </button>
          <button
            onClick={() => setSource("codeforces")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              !isLocal
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg shadow-purple-500/25"
                : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
            }`}
          >
            <GlobeIcon className="size-3.5" />
            <span>Codeforces {cfFetched ? `(${cfProblems.length})` : ""}</span>
          </button>

          {!isLocal && cfFetched && (
            <button
              onClick={loadCfProblems}
              disabled={cfLoading}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 font-mono text-[11px] transition-all cursor-pointer"
            >
              <RefreshCwIcon className={`size-3.5 ${cfLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          )}
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-xl">
          <div className="relative w-full sm:w-96">
            <SearchIcon className="size-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isLocal ? "Search problem title, algorithm, tag..." : "Search name, tag (e.g. dp, greedy, math)..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm w-full pl-10 pr-4 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-xl focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {/* DIFFICULTY CHIPS */}
            {["all", "easy", "medium", "hard"].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDifficulty === diff
                    ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/25"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* CODEFORCES TAG FILTER (only visible when codeforces tab is active) */}
        {!isLocal && cfFetched && cfTags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TagIcon className="size-3.5 text-purple-400" />
              <span className="font-mono text-[11px] text-white/50 uppercase tracking-wider">Filter by tag</span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2 scrollbar-thin">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                  selectedTag === "all"
                    ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/25"
                    : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                all
              </button>
              {cfTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/25"
                      : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── CODEFORCES LOADING / ERROR ──────────────────────────── */}
        {!isLocal && cfLoading && (
          <div className="text-center py-24 glass-panel rounded-3xl border border-white/10 font-mono">
            <LoaderIcon className="size-10 mx-auto mb-4 text-purple-400 animate-spin" />
            <h3 className="text-lg font-bold text-white mb-1">Fetching Codeforces Problems…</h3>
            <p className="text-xs text-white/50">Loading thousands of competitive programming challenges</p>
          </div>
        )}

        {!isLocal && cfError && (
          <div className="text-center py-20 glass-panel rounded-3xl border border-rose-500/20 font-mono">
            <Code2Icon className="size-12 mx-auto mb-3 text-rose-400/60" />
            <h3 className="text-lg font-bold text-white mb-1">Failed to load Codeforces problems</h3>
            <p className="text-xs text-white/50 mb-4">{cfError}</p>
            <button
              onClick={loadCfProblems}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-mono text-xs font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform"
            >
              Retry
            </button>
          </div>
        )}

        {/* ─── PROBLEMS LIST ──────────────────────────────────────── */}
        {(isLocal || (!cfLoading && !cfError && cfFetched)) && (
          <>
            {/* Result count */}
            <div className="flex items-center justify-between mb-4 font-mono text-xs text-white/50">
              <span>
                Showing {paginated.length} of {currentList.length} results
              </span>
              {!isLocal && (
                <span className="text-purple-400/70">
                  Powered by Codeforces API
                </span>
              )}
            </div>

            <div className="space-y-3.5">
              {currentList.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-3xl border border-white/10 font-mono">
                  <Code2Icon className="size-12 mx-auto mb-3 text-cyan-400/40" />
                  <h3 className="text-lg font-bold text-white mb-1">No matching algorithms found</h3>
                  <p className="text-xs text-white/50">Try clearing your search term or difficulty filter</p>
                </div>
              ) : isLocal ? (
                /* ─── LOCAL PROBLEM CARDS ─── */
                paginated.map((problem) => (
                  <Link
                    key={problem.id}
                    to={`/problem/${problem.id}`}
                    className="block glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-200 group shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="size-11 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all">
                          <Code2Icon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h2 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-cyan-300 transition-colors">
                              {problem.title}
                            </h2>
                            <span
                              className={`badge badge-xs font-mono uppercase tracking-wider py-1 px-2 ${getDifficultyBadgeClass(
                                problem.difficulty
                              )}`}
                            >
                              {problem.difficulty}
                            </span>
                            {problem.category && (
                              <span className="badge badge-xs badge-ghost font-mono text-white/50 text-[10px] py-1 px-2">
                                #{problem.category.toLowerCase().replace(/\s+/g, "-")}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-sans text-base-content/70 line-clamp-2 leading-relaxed">
                            {problem.description.text}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold sm:shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                        <span>Solve Challenge</span>
                        <ChevronRightIcon className="size-4" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                /* ─── CODEFORCES PROBLEM CARDS ─── */
                paginated.map((p) => (
                  <a
                    key={`${p.contestId}-${p.index}`}
                    href={problemUrl(p.contestId, p.index)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-200 group shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="size-11 rounded-xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 group-hover:border-purple-500/40 transition-all">
                          <span className="font-mono text-xs font-black">{p.index}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h2 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-purple-300 transition-colors">
                              {p.name}
                            </h2>
                            <span
                              className={`badge badge-xs font-mono uppercase tracking-wider py-1 px-2 ${getDifficultyBadgeClass(
                                p.difficulty
                              )}`}
                            >
                              {p.difficulty}
                            </span>
                            {p.rating && (
                              <span className="badge badge-xs badge-ghost font-mono text-white/50 text-[10px] py-1 px-2">
                                ★ {p.rating}
                              </span>
                            )}
                          </div>
                          {/* Tags row */}
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {p.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/15 text-[10px] font-mono text-purple-300/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {/* Solved count */}
                          {p.solvedCount > 0 && (
                            <p className="text-[11px] font-mono text-white/40 mt-1.5">
                              <CheckCircle2Icon className="size-3 inline-block mr-1 text-emerald-400/60" />
                              {p.solvedCount.toLocaleString()} solved
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold sm:shrink-0 self-end sm:self-center group-hover:translate-x-1 transition-transform">
                        <span>Open on CF</span>
                        <ExternalLinkIcon className="size-4" />
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>

            {/* ─── PAGINATION ───────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-10 font-mono text-xs">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ChevronLeftIcon className="size-3.5" />
                  Prev
                </button>

                <div className="flex items-center gap-1">
                  {/* Smart page buttons */}
                  {(() => {
                    const pages = [];
                    const maxButtons = 5;
                    let start = Math.max(1, page - Math.floor(maxButtons / 2));
                    let end = Math.min(totalPages, start + maxButtons - 1);
                    if (end - start + 1 < maxButtons) {
                      start = Math.max(1, end - maxButtons + 1);
                    }
                    for (let i = start; i <= end; i++) {
                      pages.push(
                        <button
                          key={i}
                          onClick={() => setPage(i)}
                          className={`size-8 rounded-lg font-bold transition-all cursor-pointer ${
                            page === i
                              ? isLocal
                                ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                                : "bg-purple-500 text-white shadow-md shadow-purple-500/25"
                              : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                          }`}
                        >
                          {i}
                        </button>
                      );
                    }
                    return pages;
                  })()}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  Next
                  <ChevronRightIcon className="size-3.5" />
                </button>

                <span className="text-white/40 ml-2">
                  Page {page} of {totalPages}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemsPage;