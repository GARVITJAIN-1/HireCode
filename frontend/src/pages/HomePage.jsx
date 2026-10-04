import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
  TerminalIcon,
  CpuIcon,
  ShieldCheckIcon,
  PlayIcon,
  ExternalLinkIcon,
  CopyIcon,
  CheckCheckIcon,
  ActivityIcon,
} from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";

function HomePage() {
  const { isSignedIn } = useUser();
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeTab, setActiveTab] = useState("solution.ts");

  const handleCopySnippet = () => {
    navigator.clipboard.writeText("npx create-hirecode-session --room=interview_42");
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-base-content relative overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* AMBIENT GLOW ORBS & CYBER GRID */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-primary/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[600px] -right-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-purple-600/15 to-transparent blur-[120px] rounded-full pointer-events-none" />

      {/* NAVBAR */}
      <nav className="glass-panel border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <div className="relative size-10 rounded-xl bg-gradient-to-br from-cyan-500 via-primary to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/20">
              <TerminalIcon className="size-5 text-white" />
              <div className="absolute -bottom-1 -right-1 size-3 bg-emerald-400 rounded-full border-2 border-[#070a12] animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl font-mono tracking-wider text-gradient-cyan">
                  HireCode
                </span>
                <span className="badge badge-xs badge-primary font-mono text-[9px] uppercase tracking-wider py-0.5 px-1.5">
                  v2.0 PRO
                </span>
              </div>
              <span className="text-[10px] text-base-content/50 font-mono -mt-0.5">
                collaborative_ide // p2p
              </span>
            </div>
          </Link>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/problems"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-base-content/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <Code2Icon className="size-4 text-cyan-400" />
              <span>Practice Bank</span>
            </Link>

            {isSignedIn ? (
              <Link
                to="/dashboard"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-white font-mono font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-white/20"
              >
                <span>Open Dashboard</span>
                <ArrowRightIcon className="size-4" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-white font-mono font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-2 border border-white/20 cursor-pointer">
                  <span>Sign In / Register</span>
                  <ArrowRightIcon className="size-4" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-inner shadow-cyan-500/10 animate-float">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-white/60">git checkout</span>
            <span className="font-bold text-cyan-400">feature/live-webrtc-interviews</span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] font-sans">
            The IDE-Grade Platform For{" "}
            <span className="text-gradient-cyan">Real-Time Pair Programming</span> & Interviews
          </h1>

          {/* SUBHEADING */}
          <p className="text-base sm:text-lg lg:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed font-sans">
            Built for 10x engineering teams and candidates. Ultra low-latency WebRTC video,
            collaborative Monaco Code Editor, live runtime diagnostics, and instant peer sync.
          </p>

          {/* CTA BUTTONS & TERMINAL SNIPPET */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isSignedIn ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-primary to-purple-600 text-white font-mono font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
              >
                <TerminalIcon className="size-5" />
                <span>Go To Interview Dashboard</span>
                <ArrowRightIcon className="size-5" />
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-primary to-purple-600 text-white font-mono font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 cursor-pointer">
                  <ZapIcon className="size-5 text-amber-300" />
                  <span>Start Coding Session &mdash; Free</span>
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>
            )}

            <Link
              to="/problems"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel text-base-content font-mono text-sm hover:text-white hover:border-cyan-500/50 transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <Code2Icon className="size-5 text-cyan-400" />
              <span>Browse 3000+ Problems</span>
            </Link>
          </div>

          {/* QUICK CLI COMMAND COPY */}
          <div className="pt-2 flex items-center justify-center">
            <div
              onClick={handleCopySnippet}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-base-content/80 hover:border-cyan-500/40 cursor-pointer transition-all shadow-inner group"
            >
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-white/90">npx create-hirecode-session --room=live</span>
              {copiedSnippet ? (
                <CheckCheckIcon className="size-4 text-emerald-400 ml-1" />
              ) : (
                <CopyIcon className="size-4 text-white/40 group-hover:text-cyan-400 ml-1 transition-colors" />
              )}
            </div>
          </div>
        </div>

        {/* HERO MOCKUP: PRO CODER DUAL IDE + WEBRTC TERMINAL */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-white/15 bg-[#0d121f]/95 shadow-[0_0_60px_-15px_rgba(56,189,248,0.25)] overflow-hidden">
            {/* TERMINAL TITLEBAR */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#090d16] border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity" />
                <div className="size-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
                <div className="size-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
                <span className="ml-3 text-white/40 text-[11px] hidden sm:inline">
                  hirecode-engine // workspace / session_9942a
                </span>
              </div>

              {/* TABS */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("solution.ts")}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors flex items-center gap-1.5 ${
                    activeTab === "solution.ts"
                      ? "bg-white/10 text-cyan-300 border border-cyan-500/30"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="size-2 rounded-full bg-cyan-400 inline-block" />
                  <span>TwoSum.ts</span>
                </button>
                <button
                  onClick={() => setActiveTab("tests.py")}
                  className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors flex items-center gap-1.5 hidden sm:flex ${
                    activeTab === "tests.py"
                      ? "bg-white/10 text-amber-300 border border-amber-500/30"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="size-2 rounded-full bg-amber-400 inline-block" />
                  <span>test_cases.json</span>
                </button>
              </div>

              {/* STATUS INDICATOR */}
              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold hidden sm:inline">CONNECTED (14ms)</span>
              </div>
            </div>

            {/* IDE CONTENT WITH LIVE VIDEO INSET */}
            <div className="grid lg:grid-cols-12 min-h-[380px]">
              {/* CODE EDITOR PANEL */}
              <div className="lg:col-span-8 p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#0b0f19]">
                <div className="space-y-1 text-slate-300">
                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">1</span>
                    <span>
                      <span className="text-purple-400">function</span>{" "}
                      <span className="text-cyan-300">twoSum</span>
                      <span className="text-white/70">(</span>
                      <span className="text-amber-200">nums</span>:{" "}
                      <span className="text-emerald-300">number[]</span>,{" "}
                      <span className="text-amber-200">target</span>:{" "}
                      <span className="text-emerald-300">number</span>
                      <span className="text-white/70">): </span>
                      <span className="text-emerald-300">number[]</span> {"{"}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">2</span>
                    <span className="text-white/40 italic">
                      {"  "}// Optimal O(N) single-pass hashmap lookup
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">3</span>
                    <span>
                      {"  "}
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-cyan-200">seen</span> ={" "}
                      <span className="text-purple-400">new</span>{" "}
                      <span className="text-cyan-400">Map</span>
                      <span className="text-white/60">&lt;</span>
                      <span className="text-emerald-300">number</span>,{" "}
                      <span className="text-emerald-300">number</span>
                      <span className="text-white/60">&gt;();</span>
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">4</span>
                    <span>
                      {"  "}
                      <span className="text-purple-400">for</span> (
                      <span className="text-purple-400">let</span>{" "}
                      <span className="text-amber-200">i</span> ={" "}
                      <span className="text-cyan-300">0</span>;{" "}
                      <span className="text-amber-200">i</span> &lt;{" "}
                      <span className="text-amber-200">nums</span>.length;{" "}
                      <span className="text-amber-200">i</span>++) {"{"}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">5</span>
                    <span>
                      {"    "}
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-amber-200">diff</span> ={" "}
                      <span className="text-amber-200">target</span> -{" "}
                      <span className="text-amber-200">nums</span>[
                      <span className="text-amber-200">i</span>];
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">6</span>
                    <span>
                      {"    "}
                      <span className="text-purple-400">if</span> (
                      <span className="text-cyan-200">seen</span>.has(
                      <span className="text-amber-200">diff</span>)) {"{"}
                    </span>
                  </div>

                  <div className="flex gap-4 bg-cyan-500/10 -mx-5 px-5 py-0.5 border-l-2 border-cyan-400">
                    <span className="text-cyan-400 font-bold select-none w-6 text-right">7</span>
                    <span>
                      {"      "}
                      <span className="text-purple-400">return</span> [
                      <span className="text-cyan-200">seen</span>.get(
                      <span className="text-amber-200">diff</span>)!,{" "}
                      <span className="text-amber-200">i</span>];
                      <span className="cursor-blink text-cyan-400 font-bold ml-1">|</span>
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">8</span>
                    <span>{"    }"}</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">9</span>
                    <span>
                      {"    "}
                      <span className="text-cyan-200">seen</span>.set(
                      <span className="text-amber-200">nums</span>[
                      <span className="text-amber-200">i</span>],{" "}
                      <span className="text-amber-200">i</span>);
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">10</span>
                    <span>{"  }"}</span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">11</span>
                    <span>
                      {"  "}
                      <span className="text-purple-400">return</span> [];
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-white/20 select-none w-6 text-right">12</span>
                    <span>{"}"}</span>
                  </div>
                </div>

                {/* TEST RUNNER DRAWER */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-white/50 mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <CheckIcon className="size-3.5" />
                      <span>3 / 3 TEST CASES PASSED</span>
                    </div>
                    <span className="text-white/40">Execution: 28ms &bull; Memory: 42.1MB</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                      <span className="text-emerald-400 font-bold">Test 1:</span> nums=[2,7,11,15]{" "}
                      <span className="text-white/60">&rarr; [0,1]</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                      <span className="text-emerald-400 font-bold">Test 2:</span> nums=[3,2,4]{" "}
                      <span className="text-white/60">&rarr; [1,2]</span>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                      <span className="text-emerald-400 font-bold">Test 3:</span> nums=[3,3]{" "}
                      <span className="text-white/60">&rarr; [0,1]</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTEGRATED WEBRTC VIDEO CALL PREVIEW */}
              <div className="lg:col-span-4 bg-[#090d16] border-t lg:border-t-0 lg:border-l border-white/10 p-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 pb-1 border-b border-white/10">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <VideoIcon className="size-3.5" />
                      <span>LIVE WEBRTC ROOM</span>
                    </div>
                    <span className="badge badge-xs badge-success gap-1">2 PARTICIPANTS</span>
                  </div>

                  {/* PEER 1 (HOST) */}
                  <div className="relative rounded-xl overflow-hidden border border-white/15 bg-gradient-to-br from-slate-800 to-slate-900 p-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative size-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-bold text-xs text-cyan-300">
                          AK
                          <div className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <div>
                          <div className="font-mono text-xs font-bold text-white flex items-center gap-1">
                            Alex K.
                            <span className="badge badge-xs badge-primary text-[8px]">HOST</span>
                          </div>
                          <div className="text-[10px] text-white/50">Staff Software Eng</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-end h-3">
                        <span className="w-1 bg-emerald-400 h-2 rounded-xs animate-pulse" />
                        <span className="w-1 bg-emerald-400 h-3 rounded-xs animate-pulse" />
                        <span className="w-1 bg-emerald-400 h-1 rounded-xs animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* PEER 2 (CANDIDATE) */}
                  <div className="relative rounded-xl overflow-hidden border border-white/15 bg-gradient-to-br from-purple-950/40 to-slate-900 p-3 shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="relative size-8 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center font-bold text-xs text-purple-300">
                          YOU
                        </div>
                        <div>
                          <div className="font-mono text-xs font-bold text-white flex items-center gap-1">
                            Candidate
                            <span className="badge badge-xs badge-success text-[8px]">ACTIVE</span>
                          </div>
                          <div className="text-[10px] text-white/50">Sharing Screen &bull; Mic ON</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-end h-3">
                        <span className="w-1 bg-purple-400 h-3 rounded-xs" />
                        <span className="w-1 bg-purple-400 h-2 rounded-xs" />
                        <span className="w-1 bg-purple-400 h-2.5 rounded-xs" />
                      </div>
                    </div>
                  </div>

                  {/* IN-SESSION CHAT SNIPPET */}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3 space-y-2 text-[11px] font-mono">
                    <div className="text-white/40 text-[10px] uppercase font-semibold">
                      Sidecar Notes // Chat
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-cyan-300">
                        <span className="text-white/40">Alex:</span> "Great approach on the hash map.
                        Now consider the edge case where target is odd."
                      </p>
                      <p className="text-purple-300">
                        <span className="text-white/40">You:</span> "Added early exit guard in line 4."
                      </p>
                    </div>
                  </div>
                </div>

                {/* CALL CONTROLS */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ActivityIcon className="size-3.5" />
                    <span>60 FPS &bull; Opus HD</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px]">1080p WebRTC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="glass-panel p-5 rounded-2xl text-center border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="text-3xl font-black font-mono text-cyan-400">&lt; 30ms</div>
            <div className="text-xs font-mono text-base-content/60 mt-1">P2P Stream Latency</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center border border-white/10 hover:border-purple-500/40 transition-colors">
            <div className="text-3xl font-black font-mono text-purple-400">100%</div>
            <div className="text-xs font-mono text-base-content/60 mt-1">Monaco Multi-Cursor</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center border border-white/10 hover:border-emerald-500/40 transition-colors">
            <div className="text-3xl font-black font-mono text-emerald-400">3000+</div>
            <div className="text-xs font-mono text-base-content/60 mt-1">DSA Problems via Codeforces</div>
          </div>
          <div className="glass-panel p-5 rounded-2xl text-center border border-white/10 hover:border-amber-500/40 transition-colors">
            <div className="text-3xl font-black font-mono text-amber-400">99.9%</div>
            <div className="text-xs font-mono text-base-content/60 mt-1">Platform Uptime</div>
          </div>
        </div>
      </div>

      {/* TECH RUNTIME STRIP */}
      <div className="border-y border-white/10 bg-[#090d16]/80 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-mono text-xs text-white/50 uppercase tracking-widest flex items-center gap-2">
              <CpuIcon className="size-4 text-cyan-400" />
              <span>Supported Execution Runtimes</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-xs text-white/80">
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-yellow-400" />
                JavaScript (Node 20)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-blue-400" />
                TypeScript 5.4
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-green-400" />
                Python 3.12
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-red-400" />
                Java 21 LTS
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-cyan-400" />
                C++20
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES GRID SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="badge badge-outline badge-primary font-mono text-xs uppercase tracking-wider py-1 px-3">
            Engineered For Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-sans">
            Everything You Need For <span className="text-gradient-cyan">10x Interviews</span>
          </h2>
          <p className="text-base text-base-content/70 font-sans">
            Replace clunky Zoom + Google Docs setups with a unified, professional coding environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* FEATURE 1 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
              <VideoIcon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-cyan-300 transition-colors">
              P2P WebRTC Video
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Crystal-clear peer-to-peer audio and video directly inside the editor without external
              calls or lag.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 text-purple-400 group-hover:scale-110 transition-transform">
              <Code2Icon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-purple-300 transition-colors">
              Monaco Code Engine
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Powered by Microsoft's Monaco Editor (same as VS Code) with multi-cursor, bracket
              matching, and syntax highlighting.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 group-hover:scale-110 transition-transform">
              <ZapIcon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-emerald-300 transition-colors">
              Real-Time Peer Sync
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Every keystroke and cursor movement syncs seamlessly between interviewer and candidate
              with sub-millisecond precision.
            </p>
          </div>

          {/* FEATURE 4 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 text-amber-400 group-hover:scale-110 transition-transform">
              <TerminalIcon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-amber-300 transition-colors">
              Massive Problem Bank
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              3000+ algorithms from Codeforces covering Two Pointers, Dynamic Programming, Graphs, Trees,
              Math, Greedy, and more — with difficulty ratings.
            </p>
          </div>

          {/* FEATURE 5 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-rose-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 text-rose-400 group-hover:scale-110 transition-transform">
              <ShieldCheckIcon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-rose-300 transition-colors">
              Instant 1-Click Rooms
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Generate passwordless cryptographic session links. One click for candidates to join
              without friction or installs.
            </p>
          </div>

          {/* FEATURE 6 */}
          <div className="glass-panel p-7 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1">
            <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 transition-transform">
              <UsersIcon className="size-6" />
            </div>
            <h3 className="text-xl font-bold font-mono mb-2 text-white group-hover:text-blue-300 transition-colors">
              Sidecar Chat & Notes
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Integrated real-time message stream for sharing pseudocode, edge cases, diagrams, and
              interviewer feedback.
            </p>
          </div>
        </div>
      </div>

      {/* PRO WORKFLOW (HOW IT WORKS) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-white/10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">
            3-Step Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-sans mt-2">
            How HireCode Powers Your Interview
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-3xl font-black text-cyan-400/40 mb-3">01</div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">Create Room & Problem</h4>
            <p className="text-sm text-base-content/70">
              Select difficulty or let HireCode randomize. A unique secure session ID is generated
              with WebRTC call bindings.
            </p>
          </div>

          <div className="relative glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-3xl font-black text-purple-400/40 mb-3">02</div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">Connect Peer & Stream</h4>
            <p className="text-sm text-base-content/70">
              Share the invite link. Both peer camera, microphone, and Monaco editor state
              synchronize in real time.
            </p>
          </div>

          <div className="relative glass-panel p-6 rounded-2xl border border-white/10">
            <div className="font-mono text-3xl font-black text-emerald-400/40 mb-3">03</div>
            <h4 className="text-lg font-bold font-mono text-white mb-2">Solve, Run & Evaluate</h4>
            <p className="text-sm text-base-content/70">
              Run test cases against standard I/O, analyze Big-O complexity, and complete the
              technical assessment.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#05080f] py-12 text-xs font-mono text-base-content/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TerminalIcon className="size-4 text-cyan-400" />
            <span className="font-bold text-white">HireCode</span> &bull; Built for 10x Engineers
          </div>
          <div className="flex items-center gap-6">
            <Link to="/problems" className="hover:text-cyan-400 transition-colors">
              Problems
            </Link>
            <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Stream WebRTC Online
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;