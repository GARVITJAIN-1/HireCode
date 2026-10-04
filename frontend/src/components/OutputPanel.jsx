import { TerminalIcon, CheckCircle2Icon, AlertCircleIcon, PlayIcon } from "lucide-react";

function OutputPanel({ output }) {
  return (
    <div className="h-full bg-[#070a12] flex flex-col min-w-0 min-h-0 overflow-hidden w-full border-t border-white/10 font-mono">
      {/* CONSOLE HEADER */}
      <div className="px-4 py-2 bg-[#090d16] border-b border-white/10 text-xs text-white/70 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-3.5 text-cyan-400" />
          <span className="font-bold text-[11px] tracking-wider uppercase text-white/90">
            Execution Console
          </span>
          <span className="text-[10px] text-white/40">// stdout &amp; stderr</span>
        </div>

        {output !== null && (
          <div>
            {output.success ? (
              <span className="badge badge-xs badge-success gap-1 font-mono text-[9px] py-1 px-2">
                <CheckCircle2Icon className="size-3" />
                EXIT: 0 (SUCCESS)
              </span>
            ) : (
              <span className="badge badge-xs badge-error gap-1 font-mono text-[9px] py-1 px-2">
                <AlertCircleIcon className="size-3" />
                EXIT: 1 (FAILED)
              </span>
            )}
          </div>
        )}
      </div>

      {/* CONSOLE BODY */}
      <div className="flex-1 overflow-auto p-4 text-xs">
        {output === null ? (
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <span className="text-cyan-400 font-bold">&gt;</span>
            <span>Awaiting execution. Click &quot;Run Code&quot; to compile and test...</span>
            <span className="cursor-blink text-cyan-400">_</span>
          </div>
        ) : output.success ? (
          <div className="space-y-2">
            <div className="text-emerald-400 text-xs flex items-center gap-1.5 font-bold">
              <CheckCircle2Icon className="size-3.5" />
              <span>Program executed successfully:</span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl whitespace-pre-wrap">
              {output.output}
            </pre>
          </div>
        ) : (
          <div className="space-y-2">
            {output.output && (
              <pre className="text-xs font-mono text-white/70 bg-white/5 p-3 rounded-xl whitespace-pre-wrap border border-white/10">
                {output.output}
              </pre>
            )}
            <div className="text-rose-400 text-xs flex items-center gap-1.5 font-bold">
              <AlertCircleIcon className="size-3.5" />
              <span>Execution Exception:</span>
            </div>
            <pre className="text-xs font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl whitespace-pre-wrap">
              {output.error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;