import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  Loader2Icon,
  MessageSquareIcon,
  UsersIcon,
  VideoIcon,
  RowsIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Channel, Chat, MessageComposer, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  // Default to "split" mode so both Video Call and Chat are visible at the same time!
  const [activeTab, setActiveTab] = useState("split");

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center bg-[#070a12] rounded-2xl p-4 font-mono">
        <div className="text-center p-6 glass-panel rounded-2xl shadow-xl border border-white/10">
          <Loader2Icon className="size-10 mx-auto animate-spin text-cyan-400 mb-3" />
          <h4 className="font-bold text-sm text-white">Connecting to Video Stream...</h4>
          <p className="text-xs text-white/50 mt-1">Negotiating WebRTC peer mesh</p>
        </div>
      </div>
    );
  }

  const hasChat = !!(chatClient && channel);

  return (
    <div className="h-full flex flex-col gap-2 relative str-video overflow-hidden min-w-0 min-h-0 w-full font-mono">
      {/* COMMUNICATION PANEL HEADER */}
      <div className="flex items-center justify-between gap-2 glass-panel p-2.5 rounded-2xl border border-white/10 shadow-lg shrink-0">
        {/* Participant Count */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <UsersIcon className="size-4 text-cyan-400" />
            <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <span className="font-semibold text-xs text-white">
            {participantCount} {participantCount === 1 ? "peer" : "peers"}
          </span>
        </div>

        {/* View Mode Switcher */}
        {hasChat && (
          <div className="join bg-white/5 p-0.5 rounded-xl border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("split")}
              className={`join-item btn btn-xs gap-1 font-mono transition-all ${
                activeTab === "split"
                  ? "bg-cyan-500 text-black font-bold shadow-xs"
                  : "btn-ghost text-white/60 hover:text-white"
              }`}
              title="Both Video + Chat visible"
            >
              <RowsIcon className="size-3" />
              <span>Split</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={`join-item btn btn-xs gap-1 font-mono transition-all ${
                activeTab === "video"
                  ? "bg-cyan-500 text-black font-bold shadow-xs"
                  : "btn-ghost text-white/60 hover:text-white"
              }`}
              title="Full Video View"
            >
              <VideoIcon className="size-3" />
              <span>Video</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`join-item btn btn-xs gap-1 font-mono transition-all ${
                activeTab === "chat"
                  ? "bg-cyan-500 text-black font-bold shadow-xs"
                  : "btn-ghost text-white/60 hover:text-white"
              }`}
              title="Full Chat View"
            >
              <MessageSquareIcon className="size-3" />
              <span>Chat</span>
            </button>
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 gap-2 overflow-hidden">
        {/* VIDEO SECTION */}
        {(activeTab === "video" || activeTab === "split") && (
          <div
            className={`flex flex-col bg-black/60 rounded-2xl overflow-hidden relative border border-white/10 min-w-0 min-h-0 ${
              activeTab === "split" ? "flex-1" : "flex-1"
            }`}
          >
            <div className="flex-1 min-h-0 relative overflow-hidden">
              <SpeakerLayout />
            </div>

            {/* In full video mode, show call controls at bottom */}
            {activeTab === "video" && (
              <div className="glass-panel p-1.5 rounded-b-2xl border-t border-white/10 flex justify-center shrink-0">
                <CallControls onLeave={() => navigate("/dashboard")} />
              </div>
            )}
          </div>
        )}

        {/* CHAT SECTION */}
        {hasChat && (activeTab === "chat" || activeTab === "split") && (
          <div
            className={`flex flex-col rounded-2xl shadow-xs overflow-hidden bg-[#0a0e1a] border border-white/10 min-w-0 min-h-0 ${
              activeTab === "split" ? "flex-1" : "flex-1"
            }`}
          >
            <div className="bg-[#070a13] px-3 py-1.5 border-b border-white/10 flex items-center justify-between shrink-0 font-mono text-xs">
              <div className="flex items-center gap-2">
                <MessageSquareIcon className="size-3.5 text-purple-400" />
                <h4 className="font-semibold text-xs text-white">Peer Chat &bull; Stream</h4>
              </div>
              {activeTab === "chat" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("split")}
                  className="btn btn-ghost btn-xs text-[11px] text-white/50 hover:text-white font-mono"
                >
                  Show Both
                </button>
              )}
            </div>

            <div className="flex-1 min-h-0 overflow-hidden stream-chat-dark">
              <Chat client={chatClient} theme="str-chat__theme-dark">
                <Channel channel={channel}>
                  <Window>
                    <MessageList />
                    <MessageComposer />
                  </Window>
                  <Thread />
                </Channel>
              </Chat>
            </div>
          </div>
        )}

        {/* In split mode, display call controls at very bottom */}
        {activeTab === "split" && (
          <div className="glass-panel p-1 rounded-2xl border border-white/10 shadow-lg flex justify-center shrink-0">
            <CallControls onLeave={() => navigate("/dashboard")} />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCallUI;