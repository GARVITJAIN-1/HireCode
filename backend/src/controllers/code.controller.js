export const executeCode = async (req, res) => {
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log("PISTON RESPONSE:", text.slice(0, 300));

    const data = JSON.parse(text);
    return res.status(response.status).json(data);
  } catch (error) {
    console.log("Code execution error:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};