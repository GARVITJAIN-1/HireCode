// Codeforces API wrapper — free, no API key needed
// Docs: https://codeforces.com/apiHelp

const CF_API_BASE = "https://codeforces.com/api";

/**
 * Fetches the entire Codeforces problem catalogue.
 * Returns { problems: [...], problemStatistics: [...] }
 */
export async function fetchCodeforcesProblems() {
  const resp = await fetch(`${CF_API_BASE}/problemset.problems`);
  if (!resp.ok) throw new Error(`Codeforces API error: ${resp.status}`);
  const data = await resp.json();
  if (data.status !== "OK") throw new Error(data.comment || "Codeforces API error");
  return data.result; // { problems, problemStatistics }
}

/**
 * Maps a Codeforces rating to an Easy / Medium / Hard label.
 */
export function ratingToDifficulty(rating) {
  if (!rating) return "Unknown";
  if (rating <= 1200) return "Easy";
  if (rating <= 1800) return "Medium";
  return "Hard";
}

/**
 * Builds the direct link to a problem on codeforces.com.
 */
export function problemUrl(contestId, index) {
  return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
}
