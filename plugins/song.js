const { cmd } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "Download songs from YouTube",
    category: "download",
    filename: __filename,
  },
  async (NazimX, mek, m, { from, q, reply }) => {
    try {
      if (!q) return reply("❌ Provide a song name or YouTube link.");

      // 🔎 Search
      const search = await yts(q);
      if (!search?.videos?.length)
        return reply("❌ No results found.");

      const data = search.videos[0];

      // ⏳ Duration Protection
      if (!data.seconds)
        return reply("❌ Unable to verify video duration.");

      if (data.seconds > 1800)
        return reply("⏳ Files longer than 30 minutes are not supported.");

      const url = data.url;

      // 🔥 Parallel Fetch (Audio + Thumbnail)
      const [songData, thumb] = await Promise.all([
        ytmp3(url, "192").catch(() => null),
        NazimX.getFile(data.thumbnail).catch(() => null),
      ]);

      if (!songData?.download?.url)
        return reply("❌ Failed to fetch audio.");

      // 🧼 Sanitize filename
      const safeTitle = data.title.replace(/[\\/:*?"<>|]/g, "").slice(0, 60);

      // 🎵 Send Audio Directly (No Extra Messages)
      await NazimX.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${safeTitle}.mp3`,
          ptt: false,
          contextInfo: {
            externalAdReply: {
              title: data.title,
              body: "NextGen-XMD • By Decent-Nazim",
              thumbnail: thumb?.data || null,
              sourceUrl: url,
              mediaType: 1,
              showAdAttribution: false,
            },
          },
        },
        { quoted: mek }
      );

      // ✅ Success Reaction
      await NazimX.sendMessage(from, {
        react: { text: "✅", key: mek.key },
      });

    } catch (err) {
      console.error("Song Command Error:", err);
      return reply("❌ Error processing request");
    }
  }
);
