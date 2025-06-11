const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// ----------- /info -----------
// Returns available progressive MP4 formats with direct URLs
app.post("/info", (req, res) => {
  const url = (req.body.url || "").trim();
  if (!url) return res.status(400).json({ error: "Missing URL" });
  console.log("Fetching formats for:", url);

  // yt_dlp json output
  exec(`python -m yt_dlp -J --no-playlist "${url}"`, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
    if (err) {
      console.error("yt_dlp error:", stderr);
      return res.status(500).json({ error: "yt_dlp failed" });
    }

    try {
      const info = JSON.parse(stdout);
      const formats = (info.formats || [])
        .filter(f => f.ext === "mp4" && f.filesize && f.vcodec !== "none" && f.acodec !== "none")
        .map(f => ({
          quality: f.format_note || f.resolution || `${f.height}p`,
          ext: f.ext,
          size: (f.filesize / (1024 * 1024)).toFixed(1) + " MB",
          url: f.url
        }));

      res.json({ title: info.title, id: info.id, formats });
    } catch (e) {
      console.error("JSON parse error:", e);
      res.status(500).json({ error: "Failed to parse yt_dlp output" });
    }
  });
});

app.get("/", (_, res) => res.send("yt1d clone backend running"));

app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
