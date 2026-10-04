import vm from "node:vm";

const COMPILER_MAP = {
  javascript: "nodejs-20.17.0",
  js: "nodejs-20.17.0",
  node: "nodejs-20.17.0",
  python: "cpython-3.12.7",
  py: "cpython-3.12.7",
  python3: "cpython-3.12.7",
  java: "openjdk-jdk-21+35",
};

function runJsLocally(code) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) =>
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
      error: (...args) =>
        logs.push("[ERROR] " + args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
      warn: (...args) =>
        logs.push("[WARN] " + args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
      info: (...args) =>
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
    },
    Math,
    Date,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    Map,
    Set,
    JSON,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
  };

  const context = vm.createContext(sandbox);
  try {
    vm.runInContext(code, context, { timeout: 4000 });
    const output = logs.join("\n") || "Program executed successfully with no output.";
    return {
      success: true,
      output,
      error: "",
      run: {
        stdout: output,
        stderr: "",
        output,
        code: 0,
      },
    };
  } catch (err) {
    const errorStr = err.message || String(err);
    const output = logs.join("\n");
    return {
      success: false,
      output,
      error: errorStr,
      run: {
        stdout: output,
        stderr: errorStr,
        output: output ? `${output}\n${errorStr}` : errorStr,
        code: 1,
      },
    };
  }
}

export const executeCode = async (req, res) => {
  try {
    const body = req.body || {};
    const rawLanguage = (body.language || "").toLowerCase().trim();
    let code = body.code || body.files?.[0]?.content || "";

    if (!rawLanguage) {
      return res.status(400).json({
        success: false,
        error: "Language is required",
      });
    }

    if (!code || typeof code !== "string" || !code.trim()) {
      return res.status(400).json({
        success: false,
        error: "Code cannot be empty",
      });
    }

    const compiler = COMPILER_MAP[rawLanguage];
    if (!compiler) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${rawLanguage}. Supported: javascript, python, java`,
      });
    }

    // For Java in Wandbox (which compiles prog.java), remove 'public class' modifier
    // so any class name (e.g. Solution, Main) can be compiled without matching file name.
    if (rawLanguage === "java") {
      code = code.replace(/public\s+class\s+/g, "class ");
    }

    // Attempt remote execution via Wandbox API
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("https://wandbox.org/api/compile.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          compiler,
          code,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const exitCode = parseInt(data.status, 10) || 0;
        const compilerError = (data.compiler_error || "").trim();
        const programError = (data.program_error || "").trim();
        const programOutput = (data.program_output || "").trim();

        const hasError = exitCode !== 0 || !!compilerError || !!programError;
        const errorText = compilerError || programError || (hasError ? `Process exited with code ${exitCode}` : "");
        const outputText = programOutput || (hasError ? "" : "Program executed successfully with no output.");

        return res.status(200).json({
          success: !hasError,
          output: outputText,
          error: errorText,
          run: {
            stdout: programOutput,
            stderr: errorText,
            output: errorText && outputText ? `${outputText}\n${errorText}` : (errorText || outputText),
            code: exitCode,
          },
        });
      }
    } catch (wandboxErr) {
      console.warn("Wandbox execution failed or timed out:", wandboxErr.message);

      // If JavaScript, fallback to local Node VM runner
      if (rawLanguage === "javascript" || rawLanguage === "js" || rawLanguage === "node") {
        const localResult = runJsLocally(code);
        return res.status(200).json(localResult);
      }

      return res.status(503).json({
        success: false,
        error: `Code execution service error: ${wandboxErr.message}`,
        run: {
          stdout: "",
          stderr: wandboxErr.message,
          output: wandboxErr.message,
          code: 1,
        },
      });
    }

    // If Wandbox returned non-OK status and it's JS, fallback to local VM
    if (rawLanguage === "javascript" || rawLanguage === "js" || rawLanguage === "node") {
      const localResult = runJsLocally(code);
      return res.status(200).json(localResult);
    }

    return res.status(502).json({
      success: false,
      error: "Remote compilation service returned an error. Please try again.",
    });
  } catch (error) {
    console.error("Code execution controller error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error during code execution",
    });
  }
};