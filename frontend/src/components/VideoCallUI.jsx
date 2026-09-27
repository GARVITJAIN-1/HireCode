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
      <div className="h-full flex items-center justify-center bg-base-200/50 rounded-xl p-4">
        <div className="text-center p-6 bg-base-100 rounded-2xl shadow-lg border border-base-300">
          <Loader2Icon className="w-10 h-10 mx-auto animate-spin text-primary mb-3" />
          <h4 className="font-bold text-sm text-base-content">Connecting to Video Call...</h4>
          <p className="text-xs text-base-content/60 mt-1">Establishing WebRTC connection</p>
        </div>
      </div>
    );
  }

  const hasChat = !!(chatClient && channel);

  return (
    <div className="h-full flex flex-col gap-2 relative str-video overflow-hidden min-w-0 min-h-0 w-full">
      {/* COMMUNICATION PANEL HEADER */}
      <div className="flex items-center justify-between gap-2 bg-base-100 p-2.5 rounded-xl border border-base-300 shadow-xs shrink-0">
        {/* Participant Count */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <UsersIcon className="w-4 h-4 text-primary" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-success ring-1 ring-base-100"></span>
          </div>
          <span className="font-semibold text-xs text-base-content">
            {participantCount} {participantCount === 1 ? "participant" : "participants"}
          </span>
        </div>

        {/* View Mode Switcher */}
        {hasChat && (
          <div className="join bg-base-200 p-0.5 rounded-lg border border-base-300">
            <button
              type="button"
              onClick={() => setActiveTab("split")}
              className={`join-item btn btn-xs gap-1 ${
                activeTab === "split" ? "btn-primary text-white shadow-xs" : "btn-ghost text-base-content/70"
              }`}
              title="Both Video + Chat visible"
            >
              <RowsIcon className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("video")}
              className={`join-item btn btn-xs gap-1 ${
                activeTab === "video" ? "btn-primary text-white shadow-xs" : "btn-ghost text-base-content/70"
              }`}
              title="Full Video View"
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Video</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`join-item btn btn-xs gap-1 ${
                activeTab === "chat" ? "btn-primary text-white shadow-xs" : "btn-ghost text-base-content/70"
              }`}
              title="Full Chat View"
            >
              <MessageSquareIcon className="w-3.5 h-3.5" />
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
            className={`flex flex-col bg-base-300 rounded-xl overflow-hidden relative border border-base-content/10 min-w-0 min-h-0 ${
              activeTab === "split" ? "flex-1" : "flex-1"
            }`}
          >
            <div className="flex-1 min-h-0 relative overflow-hidden">
              <SpeakerLayout />
            </div>

            {/* In full video mode, show call controls at bottom */}
            {activeTab === "video" && (
              <div className="bg-base-100/90 backdrop-blur-xs p-1.5 rounded-b-xl border-t border-base-300 flex justify-center shrink-0">
                <CallControls onLeave={() => navigate("/dashboard")} />
              </div>
            )}
          </div>
        )}

        {/* CHAT SECTION */}
        {hasChat && (activeTab === "chat" || activeTab === "split") && (
          <div
            className={`flex flex-col rounded-xl shadow-xs overflow-hidden bg-[#272a30] border border-[#3a3d44] min-w-0 min-h-0 ${
              activeTab === "split" ? "flex-1" : "flex-1"
            }`}
          >
            <div className="bg-[#1c1e22] px-3 py-1.5 border-b border-[#3a3d44] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquareIcon className="w-3.5 h-3.5 text-primary" />
                <h4 className="font-semibold text-xs text-white">Live Session Chat</h4>
              </div>
              {activeTab === "chat" && (
                <button
                  type="button"
                  onClick={() => setActiveTab("split")}
                  className="btn btn-ghost btn-xs text-xs text-gray-300 hover:text-white"
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
          <div className="bg-base-100 p-1 rounded-xl border border-base-300 shadow-xs flex justify-center shrink-0">
            <CallControls onLeave={() => navigate("/dashboard")} />
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCallUI;