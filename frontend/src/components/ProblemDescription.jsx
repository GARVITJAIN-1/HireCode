import { BookOpenIcon, CheckCircle2Icon, Code2Icon, SparklesIcon, TerminalIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return (
    <div className="h-full overflow-y-auto bg-[#080c16] text-white">
      {/* HEADER SECTION */}
      <div className="p-5 sm:p-6 bg-[#0a0f1c] border-b border-white/10">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Code2Icon className="size-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
              {problem.title}
            </h1>
          </div>
          <span
            className={`badge badge-sm font-mono uppercase tracking-wider py-1 px-2.5 ${getDifficultyBadgeClass(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
        </div>

        <p className="text-xs font-mono text-cyan-400/80 mb-4">
          #{problem.category.toLowerCase().replace(/\s+/g, "-")} &bull; Algorithm Challenge
        </p>

        {/* Problem selector */}
        <div>
          <select
            className="select select-sm w-full bg-white/5 border border-white/10 text-white font-mono text-xs rounded-xl focus:border-cyan-400"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id} className="bg-[#0b0f19] text-white">
                {p.title} &mdash; [{p.difficulty}]
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* PROBLEM DESC */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-lg">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
            <TerminalIcon className="size-3.5" />
            <span>Problem Statement</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
            <p>{problem.description.text}</p>
            {problem.description.notes?.map((note, idx) => (
              <p key={idx} className="p-2.5 rounded-xl bg-white/5 border-l-2 border-cyan-400 text-xs text-white/70 font-mono">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-lg">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
            <Code2Icon className="size-3.5" />
            <span>Input & Output Test Cases</span>
          </h2>

          <div className="space-y-4 font-mono text-xs">
            {problem.examples.map((example, idx) => (
              <div key={idx} className="rounded-xl bg-black/40 border border-white/5 p-3.5 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                  <span className="text-[11px] font-bold text-white/90">
                    Test Case #{idx + 1}
                  </span>
                  <span className="badge badge-xs badge-ghost text-[9px]">STANDARD I/O</span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="text-cyan-400 font-bold min-w-16">Input:</span>
                    <span className="text-white/90 font-mono">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400 font-bold min-w-16">Output:</span>
                    <span className="text-emerald-300 font-mono">{example.output}</span>
                  </div>
                </div>

                {example.explanation && (
                  <div className="pt-2 border-t border-white/5 text-[11px] text-white/50 font-sans">
                    <strong className="text-white/70">Explanation: </strong> {example.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 shadow-lg">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
            // Computational Constraints
          </h2>
          <ul className="space-y-2 text-xs font-mono text-white/70">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">&bull;</span>
                <code className="text-amber-200/90 bg-white/5 px-1.5 py-0.5 rounded">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;