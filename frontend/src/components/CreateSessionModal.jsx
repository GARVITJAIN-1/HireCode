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
      <div className="modal-box max-w-4xl p-0 overflow-hidden bg-base-100 shadow-2xl border border-base-content/10 rounded-2xl flex flex-col max-h-[90vh]">
        {/* MODAL HEADER */}
        <div className="p-6 bg-base-200/60 border-b border-base-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md">
              <SparklesIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-base-content">Create Interview Session</h3>
              <p className="text-sm text-base-content/60">
                Configure your interview challenge and launch a collaborative workspace
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-base-content"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="p-5 border-b border-base-300 bg-base-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <SearchIcon className="w-4 h-4 text-base-content/50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-sm input-bordered w-full pl-9 pr-8"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
              >
                <XIcon className="w-3.5 h-3.5" />
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
                  className={`btn btn-xs rounded-full capitalize px-3 transition-all ${
                    difficultyFilter === diff
                      ? "btn-primary text-white shadow-sm"
                      : "btn-ghost text-base-content/70 hover:bg-base-200"
                  }`}
                >
                  {diff}
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      difficultyFilter === diff
                        ? "bg-white/20 text-white"
                        : "bg-base-300 text-base-content/70"
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
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-0">
          {/* PROBLEM LIST (LEFT 7 COLS) */}
          <div className="md:col-span-6 lg:col-span-7 border-b md:border-b-0 md:border-r border-base-300 overflow-y-auto p-4 space-y-2.5 max-h-[380px]">
            {filteredProblems.length === 0 ? (
              <div className="text-center py-12 text-base-content/50">
                <Code2Icon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                <p className="font-medium">No problems found</p>
                <p className="text-xs mt-1">Try searching for something else or change filter</p>
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
                        ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
                        : "border-base-300 bg-base-100 hover:bg-base-200/70 hover:border-base-content/20"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={`font-semibold text-sm truncate ${
                            isSelected ? "text-primary" : "text-base-content"
                          }`}
                        >
                          {problem.title}
                        </h4>
                        <span
                          className={`badge badge-xs text-[11px] font-medium ${getDifficultyBadgeClass(
                            problem.difficulty
                          )}`}
                        >
                          {problem.difficulty}
                        </span>
                      </div>
                      {problem.category && (
                        <p className="text-xs text-base-content/60 truncate">{problem.category}</p>
                      )}
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <CheckCircle2Icon className="w-5 h-5 text-primary" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-base-300" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* PROBLEM PREVIEW (RIGHT 5 COLS) */}
          <div className="md:col-span-6 lg:col-span-5 bg-base-200/40 p-5 overflow-y-auto max-h-[380px] flex flex-col">
            {selectedProblem ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`badge badge-sm ${getDifficultyBadgeClass(
                        selectedProblem.difficulty
                      )}`}
                    >
                      {selectedProblem.difficulty}
                    </span>
                    <span className="text-xs text-base-content/60 font-medium">
                      {selectedProblem.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-base-content">{selectedProblem.title}</h4>
                </div>

                {/* Description Snippet */}
                <div className="bg-base-100 p-3 rounded-xl border border-base-300 text-xs text-base-content/80 leading-relaxed">
                  <p className="font-semibold text-base-content mb-1">Overview:</p>
                  <p className="line-clamp-4">{selectedProblem.description.text}</p>
                </div>

                {/* Example 1 Preview */}
                {selectedProblem.examples?.[0] && (
                  <div className="bg-base-100 p-3 rounded-xl border border-base-300 text-xs">
                    <p className="font-semibold text-base-content mb-1.5 flex items-center justify-between">
                      <span>Example 1:</span>
                    </p>
                    <div className="bg-base-200 p-2 rounded-lg font-mono space-y-1 text-[11px]">
                      <div>
                        <span className="text-primary font-semibold">Input: </span>
                        <span>{selectedProblem.examples[0].input}</span>
                      </div>
                      <div>
                        <span className="text-secondary font-semibold">Output: </span>
                        <span>{selectedProblem.examples[0].output}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Session Features info */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 space-y-1.5 text-xs text-base-content/80">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <UsersIcon className="w-3.5 h-3.5" />
                    <span>1-on-1 Collaborative Session</span>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70 text-[11px]">
                    <VideoIcon className="w-3 h-3 text-secondary" />
                    <span>Stream WebRTC Video & Audio</span>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70 text-[11px]">
                    <TerminalIcon className="w-3 h-3 text-accent" />
                    <span>Interactive Monaco Code Editor</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[220px] flex flex-col items-center justify-center text-center text-base-content/50 p-6">
                <Code2Icon className="w-12 h-12 mb-3 opacity-30 text-primary" />
                <p className="font-semibold text-sm text-base-content/80">Select a Coding Challenge</p>
                <p className="text-xs mt-1 max-w-xs text-base-content/60">
                  Click on any problem from the list on the left to review its details and examples.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* MODAL ACTION FOOTER */}
        <div className="p-4 bg-base-200/80 border-t border-base-300 flex items-center justify-between gap-3">
          <div className="text-xs text-base-content/70 hidden sm:block truncate">
            {roomConfig.problem ? (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Ready to launch: <strong className="text-base-content">{roomConfig.problem}</strong>
              </span>
            ) : (
              <span>Please pick a problem to proceed</span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="btn btn-sm btn-ghost" onClick={handleClose}>
              Cancel
            </button>

            <button
              className="btn btn-sm btn-primary gap-2 text-white shadow-md"
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
            >
              {isCreating ? (
                <>
                  <LoaderIcon className="w-4 h-4 animate-spin" />
                  Creating Session...
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  Create Session
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop bg-black/60 backdrop-blur-xs" onClick={handleClose}></div>
    </div>
  );
}

export default CreateSessionModal;