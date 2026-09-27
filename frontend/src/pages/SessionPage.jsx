import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { getDifficultyBadgeClass } from "../lib/utils";
import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
  BookOpenIcon,
  CheckIcon,
  UsersIcon,
  Share2Icon,
  GripVerticalIcon,
  GripHorizontalIcon,
} from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import toast from "react-hot-toast";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  // Controlled, reliable widths for all 3 panels so NONE can ever be crushed
  const [leftWidth, setLeftWidth] = useState(() =>
    typeof window !== "undefined"
      ? Math.max(300, Math.min(460, Math.round(window.innerWidth * 0.28)))
      : 360
  );
  const [rightWidth, setRightWidth] = useState(() =>
    typeof window !== "undefined"
      ? Math.max(320, Math.min(500, Math.round(window.innerWidth * 0.30)))
      : 400
  );
  const [outputHeight, setOutputHeight] = useState(210);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [syncedProblem, setSyncedProblem] = useState(null);

  // Synchronize starter code when problemData loads or changes
  if (problemData && problemData.title !== syncedProblem) {
    setSyncedProblem(problemData.title);
    setCode(problemData.starterCode?.[selectedLanguage] || "");
  }

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id, joinSessionMutation, refetch]);

  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);

    const starterCode = problemData?.starterCode?.[newLang] || "";
    setCode(starterCode);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setOutput({
      success: false,
      error:
        "Code execution is temporarily unavailable. The public Piston API is no longer publicly accessible. A self-hosted code execution service will be added soon.",
    });
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  const handleCopyInviteLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setHasCopiedLink(true);
    toast.success("Interview invite link copied to clipboard!");
    setTimeout(() => setHasCopiedLink(false), 2500);
  };

  // DRAG RESIZING HANDLERS
  const handleLeftDrag = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = leftWidth;

      const onMouseMove = (moveEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(260, Math.min(window.innerWidth * 0.45, startWidth + delta));
        setLeftWidth(newWidth);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      };

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [leftWidth]
  );

  const handleRightDrag = useCallback(
    (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = rightWidth;

      const onMouseMove = (moveEvent) => {
        const delta = startX - moveEvent.clientX;
        const newWidth = Math.max(280, Math.min(window.innerWidth * 0.45, startWidth + delta));
        setRightWidth(newWidth);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      };

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [rightWidth]
  );

  const handleOutputDrag = useCallback(
    (e) => {
      e.preventDefault();
      const startY = e.clientY;
      const startHeight = outputHeight;

      const onMouseMove = (moveEvent) => {
        const delta = startY - moveEvent.clientY;
        const newHeight = Math.max(100, Math.min(450, startHeight + delta));
        setOutputHeight(newHeight);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "default";
        document.body.style.userSelect = "auto";
      };

      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [outputHeight]
  );

  return (
    <div className="h-screen bg-base-100 flex flex-col overflow-hidden w-full">
      <Navbar />

      {/* SESSION TOP CONTROL RIBBON */}
      <div className="bg-base-200/90 border-b border-base-300 px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-xs z-10">
        {/* Left: Problem info, badges & participants */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-base text-base-content truncate max-w-[200px] sm:max-w-xs">
              {session?.problem || "Interview Room"}
            </h2>

            <span
              className={`badge badge-sm font-semibold ${getDifficultyBadgeClass(
                session?.difficulty
              )}`}
            >
              {session?.difficulty
                ? session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)
                : "Easy"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-base-content/70 border-l border-base-300 pl-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              Live Session
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <UsersIcon className="w-3.5 h-3.5 text-primary" />
              {session?.participant ? "2/2 Connected" : "1/2 Waiting for candidate"}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Copy Invite Link */}
          <button
            onClick={handleCopyInviteLink}
            className="btn btn-xs sm:btn-sm btn-ghost gap-1.5 text-base-content/80 hover:text-base-content"
            title="Copy candidate invite link"
          >
            {hasCopiedLink ? (
              <CheckIcon className="w-3.5 h-3.5 text-success" />
            ) : (
              <Share2Icon className="w-3.5 h-3.5 text-primary" />
            )}
            <span>{hasCopiedLink ? "Link Copied!" : "Invite Candidate"}</span>
          </button>

          {/* End Session Button for Host */}
          {isHost && session?.status === "active" && (
            <button
              onClick={handleEndSession}
              disabled={endSessionMutation.isPending}
              className="btn btn-error btn-xs sm:btn-sm gap-1.5 text-white shadow-xs ml-1"
            >
              {endSessionMutation.isPending ? (
                <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOutIcon className="w-3.5 h-3.5" />
              )}
              <span>End Session</span>
            </button>
          )}

          {session?.status === "completed" && (
            <span className="badge badge-ghost badge-sm">Completed</span>
          )}
        </div>
      </div>

      {/* MAIN WORKSPACE LAYOUT (3 PANELS: PROBLEM, EDITOR + OUTPUT, VIDEO + CHAT ALL VISIBLE SIMULTANEOUSLY) */}
      <div className="flex-1 w-full flex overflow-hidden relative min-h-0 min-w-0">
        {/* PANEL 1: PROBLEM DETAILS (LEFT COLUMN) */}
        <div
          style={{ width: `${leftWidth}px` }}
          className="h-full overflow-y-auto bg-base-200/50 flex flex-col border-r border-base-300 min-w-[260px] max-w-[45vw] shrink-0"
        >
          {/* Header */}
          <div className="p-3 bg-base-100 border-b border-base-300 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <BookOpenIcon className="w-4 h-4 text-primary shrink-0" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-base-content truncate">
                Problem Description
              </h3>
            </div>
            {problemData?.category && (
              <span className="text-[11px] text-base-content/60 truncate font-medium">
                {problemData.category}
              </span>
            )}
          </div>

          {/* Problem Body */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div>
              <h3 className="text-lg font-bold text-base-content leading-tight">
                {session?.problem || "Problem"}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`badge badge-xs text-[10px] ${getDifficultyBadgeClass(
                    session?.difficulty
                  )}`}
                >
                  {session?.difficulty || "Easy"}
                </span>
                <span className="text-xs text-base-content/60">
                  Host: {session?.host?.name || "Interviewer"}
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            {problemData?.description && (
              <div className="bg-base-100 rounded-xl p-3.5 border border-base-300 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-base-content uppercase tracking-wider">
                  Overview
                </h4>
                <div className="space-y-2 text-xs leading-relaxed text-base-content/90">
                  <p>{problemData.description.text}</p>
                  {problemData.description.notes?.map((note, idx) => (
                    <p key={idx} className="text-base-content/75 italic">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* EXAMPLES */}
            {problemData?.examples && problemData.examples.length > 0 && (
              <div className="bg-base-100 rounded-xl p-3.5 border border-base-300 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-base-content uppercase tracking-wider">
                  Examples
                </h4>
                <div className="space-y-3">
                  {problemData.examples.map((example, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <span className="badge badge-ghost badge-xs font-medium">
                        Example {idx + 1}
                      </span>
                      <div className="bg-base-200/90 rounded-lg p-2.5 font-mono text-xs space-y-1 border border-base-300/60">
                        <div className="flex gap-2">
                          <span className="text-primary font-bold min-w-12">Input:</span>
                          <span className="text-base-content/90 break-all">{example.input}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-secondary font-bold min-w-12">Output:</span>
                          <span className="text-base-content/90 break-all">{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div className="pt-1.5 border-t border-base-300/80 mt-1 font-sans text-[11px] text-base-content/70">
                            <span className="font-semibold text-base-content">Explanation: </span>
                            {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONSTRAINTS */}
            {problemData?.constraints && problemData.constraints.length > 0 && (
              <div className="bg-base-100 rounded-xl p-3.5 border border-base-300 shadow-xs space-y-2">
                <h4 className="text-xs font-bold text-base-content uppercase tracking-wider">
                  Constraints
                </h4>
                <ul className="space-y-1 text-xs text-base-content/90">
                  {problemData.constraints.map((constraint, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <code className="bg-base-200 px-1 py-0.5 rounded text-[11px]">
                        {constraint}
                      </code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* LEFT DRAG SPLITTER */}
        <div
          onMouseDown={handleLeftDrag}
          className="w-1.5 bg-base-300 hover:bg-primary transition-colors cursor-col-resize shrink-0 flex items-center justify-center group"
          title="Drag to resize Problem Description"
        >
          <GripVerticalIcon className="w-3 h-3 text-base-content/30 group-hover:text-white" />
        </div>

        {/* PANEL 2: MONACO CODE EDITOR & OUTPUT CONSOLE (CENTER COLUMN) */}
        <div className="flex-1 min-w-[320px] h-full flex flex-col min-h-0 overflow-hidden">
          {/* Top Monaco Editor Area */}
          <div className="flex-1 min-h-0 min-w-0 overflow-hidden">
            <CodeEditorPanel
              selectedLanguage={selectedLanguage}
              code={code}
              onLanguageChange={handleLanguageChange}
              onCodeChange={(value) => setCode(value)}
              onRunCode={handleRunCode}
            />
          </div>

          {/* HORIZONTAL DRAG SPLITTER */}
          <div
            onMouseDown={handleOutputDrag}
            className="h-1.5 bg-base-300 hover:bg-primary transition-colors cursor-row-resize shrink-0 flex items-center justify-center group"
            title="Drag to resize Console"
          >
            <GripHorizontalIcon className="w-3 h-3 text-base-content/30 group-hover:text-white" />
          </div>

          {/* Bottom Execution Console Area */}
          <div
            style={{ height: `${outputHeight}px` }}
            className="w-full shrink-0 min-h-[90px] max-h-[450px] overflow-hidden flex flex-col"
          >
            <OutputPanel output={output} />
          </div>
        </div>

        {/* RIGHT DRAG SPLITTER */}
        <div
          onMouseDown={handleRightDrag}
          className="w-1.5 bg-base-300 hover:bg-primary transition-colors cursor-col-resize shrink-0 flex items-center justify-center group"
          title="Drag to resize Video & Chat"
        >
          <GripVerticalIcon className="w-3 h-3 text-base-content/30 group-hover:text-white" />
        </div>

        {/* PANEL 3: VIDEO CALL & CHAT (RIGHT COLUMN) */}
        <div
          style={{ width: `${rightWidth}px` }}
          className="h-full bg-base-200/60 p-2 flex flex-col overflow-hidden border-l border-base-300 min-w-[280px] max-w-[45vw] shrink-0"
        >
          <div className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col">
            {isInitializingCall ? (
              <div className="h-full flex items-center justify-center bg-base-100 rounded-xl p-4">
                <div className="text-center">
                  <Loader2Icon className="w-8 h-8 mx-auto animate-spin text-primary mb-2" />
                  <p className="font-semibold text-xs text-base-content">
                    Connecting to Video & Chat...
                  </p>
                </div>
              </div>
            ) : !streamClient || !call ? (
              <div className="h-full flex items-center justify-center bg-base-100 rounded-xl p-4">
                <div className="card max-w-xs text-center">
                  <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <PhoneOffIcon className="w-6 h-6 text-error" />
                  </div>
                  <h4 className="font-bold text-sm text-base-content mb-1">Call Disconnected</h4>
                  <p className="text-xs text-base-content/70">
                    Unable to connect to WebRTC stream
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-0 min-w-0 overflow-hidden flex flex-col">
                <StreamVideo client={streamClient}>
                  <StreamCall call={call}>
                    <VideoCallUI chatClient={chatClient} channel={channel} />
                  </StreamCall>
                </StreamVideo>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionPage;