import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, SparklesIcon, TerminalIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-[#0b0f19] flex flex-col min-w-0 min-h-0 overflow-hidden w-full">
      {/* IDE TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#080c16] border-b border-white/10 shrink-0 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="size-4"
            />
            <select
              className="bg-transparent text-white font-mono text-xs focus:outline-hidden cursor-pointer"
              value={selectedLanguage}
              onChange={onLanguageChange}
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} className="bg-[#0b0f19] text-white">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-white/40 hidden sm:inline">
            // auto_format: on &bull; monaco_engine
          </span>
        </div>

        <button
          className="btn btn-sm font-mono text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-bold border-none shadow-md shadow-emerald-500/20 px-4 rounded-xl gap-2 hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <PlayIcon className="size-3.5 fill-current" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 min-w-0 overflow-hidden relative">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            renderLineHighlight: "all",
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;