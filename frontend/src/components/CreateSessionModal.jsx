import { useState } from "react";
import {
  Code2Icon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  VideoIcon,
  CheckCircle2Icon,
  UsersIcon,
  TerminalIcon,
  XIcon,
} from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { getDifficultyBadgeClass } from "../lib/utils";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  if (!isOpen) return null;

  // Filter problems by search term and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (problem.category && problem.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesDifficulty;
  });

  const selectedProblem = problems.find((p) => p.title === roomConfig.problem);

  const handleSelectProblem = (problem) => {
    setRoomConfig({
      difficulty: problem.difficulty,
      problem: problem.title,
    });
  };

  const handleClose = () => {
    setSearchTerm("");
    setDifficultyFilter("all");
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl p-0 overflow-hidden bg-[#0c101b] shadow-2xl border border-white/15 rounded-3xl flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="p-5 sm:p-6 bg-[#080c16] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl bg-gradient-to-br from-cyan-500 via-primary to-purple-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25 border border-white/20">
              <TerminalIcon className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-sans text-xl text-white">Create Interview Room</h3>
                <span className="badge badge-xs badge-primary font-mono text-[9px]">WEBRTC P2P</span>
              </div>
              <p className="text-xs font-mono text-base-content/60">
                Select an algorithm challenge and initialize your collaborative room
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-white"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="p-4 border-b border-white/10 bg-[#090d18] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="size-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem title or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm w-full pl-9 pr-8 bg-white/5 border border-white/10 text-white font-mono text-xs rounded-xl focus:border-cyan-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Chips */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "easy", "medium", "hard"].map((diff) => {
              const count =
                diff === "all"
                  ? problems.length
                  : problems.filter((p) => p.difficulty.toLowerCase() === diff).length;

              return (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setDifficultyFilter(diff)}
                  className={`btn btn-xs rounded-lg capitalize px-3 font-mono text-xs transition-all ${
                    difficultyFilter === diff
                      ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {diff}
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded text-[10px] ${
                      difficultyFilter === diff
                        ? "bg-black/20 text-black font-bold"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODAL BODY (TWO COLUMN: PROBLEM LIST + PREVIEW) */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0 bg-[#090d18]">
          {/* PROBLEM LIST (LEFT 7 COLS) */}
          <div className="md:col-span-6 lg:col-span-7 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto p-4 space-y-2 max-h-[380px]">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12 text-white/40 font-mono">
                <Code2Icon className="size-10 mx-auto mb-2 opacity-30 text-cyan-400" />
                <p className="font-semibold text-sm">No matching challenges found</p>
                <p className="text-xs mt-1">Try another search keyword or clear filters</p>
              </div>
            ) : (
              filteredProblems.map((problem) => {
                const isSelected = roomConfig.problem === problem.title;
                return (
                  <div
                    key={problem.id}
                    onClick={() => handleSelectProblem(problem)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-cyan-400/80 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400"
                        : "border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`font-mono font-bold text-sm truncate ${
                            isSelected ? "text-cyan-300" : "text-white"
                          }`}
                        >
                          {problem.title}
                        </h4>
                        <span
                          className={`badge badge-xs font-mono uppercase text-[10px] py-1 px-1.5 ${getDifficultyBadgeClass(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      {problem.category && (
                        <p className="text-xs font-mono text-base-content/50 truncate">
                          {problem.category}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <CheckCircle2Icon className="size-5 text-cyan-400" />
                      ) : (
                        <div className="size-4 rounded-full border border-white/20" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PROBLEM PREVIEW (RIGHT 5 COLS) */}
          <div className="md:col-span-6 lg:col-span-5 bg-[#060911] p-5 overflow-y-auto max-h-[380px] flex flex-col font-mono text-xs">
            {selectedProblem ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`badge badge-xs font-mono uppercase ${getDifficultyBadgeClass(
                        selectedProblem.difficulty
                      )}`}
                    >
                      {selectedProblem.difficulty}
                    </span>
                    <span className="text-xs text-white/50">{selectedProblem.category}</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-mono">
                    {selectedProblem.title}
                  </h4>
                </div>

                {/* Description Snippet */}
                <div className="bg-black/50 p-3 rounded-xl border border-white/10 text-white/70 leading-relaxed text-xs">
                  <p className="font-semibold text-cyan-400 mb-1">// Description:</p>
                  <p className="line-clamp-4 font-sans text-xs">
                    {selectedProblem.description.text}
                  </p>
                </div>

                {/* Example Preview */}
                {selectedProblem.examples?.[0] && (
                  <div className="bg-black/50 p-3 rounded-xl border border-white/10 text-xs">
                    <p className="font-semibold text-amber-300 mb-1">// Example 1:</p>
                    <div className="space-y-1 text-[11px] text-white/80">
                      <div>
                        <span className="text-cyan-400">Input: </span>
                        <span>{selectedProblem.examples[0].input}</span>
                      </div>
                      <div>
                        <span className="text-purple-400">Output: </span>
                        <span>{selectedProblem.examples[0].output}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features info */}
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-3 space-y-1.5 text-xs text-white/70">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <UsersIcon className="size-3.5" />
                    <span>2-Peer Collaborative Room</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-[11px]">
                    <VideoIcon className="size-3.5 text-purple-400" />
                    <span>WebRTC Audio & 1080p Video</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-[11px]">
                    <TerminalIcon className="size-3.5 text-emerald-400" />
                    <span>Monaco Multi-Cursor Editor</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center text-white/40 p-6">
                <Code2Icon className="size-10 mb-3 text-cyan-400/40" />
                <p className="font-semibold text-sm text-white/80">Pick a Problem</p>
                <p className="text-xs mt-1 text-white/50 max-w-xs">
                  Select any algorithmic challenge to view test cases and initialize the room.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* MODAL ACTION FOOTER */}
        <div className="p-4 bg-[#080c16] border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-xs font-mono text-white/60 hidden sm:block truncate">
            {roomConfig.problem ? (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Ready to bind: <strong className="text-white">{roomConfig.problem}</strong>
              </span>
            ) : (
              <span>Select a challenge to continue</span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="btn btn-sm btn-ghost font-mono text-xs text-white/60" onClick={handleClose}>
              Cancel
            </button>

            <button
              className="btn btn-sm font-mono text-xs bg-gradient-to-r from-cyan-500 to-primary text-black font-bold border-none shadow-lg shadow-cyan-500/25 px-5 rounded-xl gap-2 hover:scale-105 transition-all cursor-pointer"
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
            >
              {isCreating ? (
                <>
                  <LoaderIcon className="size-4 animate-spin" />
                  Binding Room...
                </>
              ) : (
                <>
                  <PlusIcon className="size-4" />
                  Launch Room
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/80 backdrop-blur-sm" onClick={handleClose}></div>
    </div>
  );
}

export default CreateSessionModal;