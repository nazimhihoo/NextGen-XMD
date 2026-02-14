const { cmd, commands } = require("../command");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Download YouTube Song",
    category: "download",
    filename: __filename,
  },
  async (
    NazimX,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("❌ *Please provide a song name or YouTube link*");

      // 1️⃣ Search YouTube
      const search = await yts(q);
      const data = search.videos[0];
      if (!data) return reply("❌ *No results found for this query*");

      // Song metadata
      const desc = `
🎬 *Title:* ${data.title}
⏱️ *Duration:* ${data.timestamp}
📅 *Uploaded:* ${data.ago}
👀 *Views:* ${data.views.toLocaleString()}
🔗 *Watch Here:* ${data.url}
`;

      // Send metadata + thumbnail
      await NazimX.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption: desc },
        { quoted: mek }
      );

      // Duration check (max 30 min)
      const durationParts = data.timestamp.split(":").map(Number);
      const totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply(
          "⏳ *Sorry, audio files longer than 30 minutes are not supported.*"
        );
      }

      // 2️⃣ Download audio using ytdl-core
      const info = await ytdl.getInfo(data.url);
      const format = ytdl.chooseFormat(info.formats, { quality: "highestaudio" });
      if (!format?.url) return reply("❌ *Unable to fetch audio*");

      // 3️⃣ Send audio file
      await NazimX.sendMessage(
        from,
        {
          audio: { url: format.url },
          mimetype: "audio/mpeg",
        },
        { quoted: mek }
      );

      // 4️⃣ Optional: Send as document (MP3)
      await NazimX.sendMessage(
        from,
        {
          document: { url: format.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "🎶 *Your song is ready!*",
        },
        { quoted: mek }
      );

      return reply("✅ Song delivered successfully!");
    } catch (e) {
      console.log("SONG COMMAND ERROR:", e);
      reply(`❌ *Error:* ${e.message} 😞`);
    }
  }
);
