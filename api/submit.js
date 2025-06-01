export default async function handler(req, res) {
  // 💡✅ Always set CORS headers for all requests (not just OPTIONS)
  res.setHeader("Access-Control-Allow-Origin", "https://www.stouras.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 💡✅ Handle CORS preflight (OPTIONS request)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Reject non-POST requests
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // 🔍 ✅ Log the exact payload from the Tetris app
    console.log("Incoming data:", JSON.stringify(req.body, null, 2));

    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyvm1-w5Fn_QH_08TkP6ABtSUzJr_EyznCNykNaApQrQLOl1vAYkLtIr2HCp1zCg62t/exec';

    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).send("Proxy error: " + err.message);
  }
}
