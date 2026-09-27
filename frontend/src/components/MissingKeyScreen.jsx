import { useState } from "react";

function MissingKeyScreen({ onSaveKey }) {
  const [inputKey, setInputKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputKey.trim()) {
      localStorage.setItem("VITE_CLERK_PUBLISHABLE_KEY", inputKey.trim());
      onSaveKey(inputKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex items-center justify-center p-6">
      <div className="card bg-base-100 max-w-xl w-full shadow-2xl border border-warning/30 overflow-hidden">
        <div className="bg-warning/10 p-6 border-b border-warning/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/20 text-warning flex items-center justify-center font-bold text-xl">
            !
          </div>
          <div>
            <h2 className="text-xl font-bold text-base-content">Missing Clerk Publishable Key</h2>
            <p className="text-xs text-base-content/70">
              HireCode requires a Clerk publishable key to authenticate users and render the UI.
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-base-content">Option 1: Create a `.env` file (Recommended)</h3>
            <p className="text-xs text-base-content/70">
              Create a file named <code className="bg-base-200 px-1.5 py-0.5 rounded font-mono">.env</code> in your <code className="bg-base-200 px-1.5 py-0.5 rounded font-mono">frontend/</code> directory with the following contents:
            </p>
            <div className="bg-base-300 rounded-xl p-4 font-mono text-xs text-base-content/90 space-y-1 overflow-x-auto border border-base-content/10">
              <div>VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</div>
              <div>VITE_API_URL=http://localhost:5000/api</div>
            </div>
          </div>

          <div className="divider text-xs text-base-content/40">OR QUICK TEST</div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-base-content">Option 2: Paste Key for This Browser Session</h3>
            <p className="text-xs text-base-content/70">
              Paste your <code className="font-mono text-primary">pk_test_...</code> key from your{" "}
              <a
                href="https://dashboard.clerk.com"
                target="_blank"
                rel="noreferrer"
                className="link link-primary"
              >
                Clerk Dashboard
              </a>{" "}
              below to launch immediately:
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="pk_test_..."
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="input input-bordered input-sm flex-1 font-mono text-xs"
                required
              />
              <button type="submit" className="btn btn-sm btn-primary text-white">
                Save & Load UI
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissingKeyScreen;
