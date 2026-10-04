import axiosInstance from "./axios";

const LANGUAGE_CONFIG = {
  javascript: { language: "javascript" },
  python: { language: "python" },
  java: { language: "java" },
};

/**
 * Execute code via backend compilation endpoint
 * @param {string} language - programming language ('javascript', 'python', 'java')
 * @param {string} code - source code to execute
 * @returns {Promise<{success: boolean, output?: string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const langKey = (language || "").toLowerCase().trim();
    if (!LANGUAGE_CONFIG[langKey]) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    if (!code || !code.trim()) {
      return {
        success: false,
        error: "Please write some code before running.",
      };
    }

    const response = await axiosInstance.post("/code/execute", {
      language: langKey,
      code,
    });

    const data = response.data;

    // Standardized response from backend
    if (data.success) {
      return {
        success: true,
        output: data.output || "Program finished with no output.",
        error: "",
      };
    }

    return {
      success: false,
      output: data.output || "",
      error: data.error || (data.run?.stderr) || "Execution failed",
    };
  } catch (error) {
    console.error("Code execution error:", error);
    const backendMessage = error.response?.data?.error || error.response?.data?.message;
    return {
      success: false,
      error: backendMessage || error.message || "Failed to execute code. Check your network connection.",
    };
  }
}