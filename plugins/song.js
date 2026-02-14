const { cmd } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎶",
    desc: "> Dₒwₙₗₒₐd ₛₒₙg fᵣₒₘ Yₒᵤₜᵤbₑ",
    category: "download",
    filename: __filename,
  },
  async (NazimX, mek, m, { from, q, reply }) => {
    try {
      if (!q)
        return reply(
          "> ❌ ℙ𝕝𝕖𝕒𝕤𝕖 𝕡𝕣𝕠𝕧𝕚𝕕𝕖 𝕒 𝕤𝕠𝕟𝕘 𝕟𝕒𝕞𝕖 𝕠𝕣 𝕐𝕠𝕦𝕋𝕦𝕓𝕖 𝕝𝕚𝕟𝕜!"
        );

      await reply("> ⏳ ꜱᴇᴀʀᴄʜɪɴɢ ꜰᴏʀ ʏᴏᴜʀ ꜱᴏɴɢ... ʜᴀɴɢ ᴛɪɢʜᴛ!");

      const search = await yts(q);

      if (!search.videos || search.videos.length === 0) {
        return reply("> ❌ 𝗡𝗼 𝗿𝗲𝘀𝘂𝗹𝘁𝘀 𝗳𝗼𝘂𝗻𝗱 𝗼𝗻 𝗬𝗼𝘂𝗧𝘂𝗯𝗲!");
      }

      const data = search.videos[0];
      const url = data.url;

      const caption = `
🎵 *SONG DOWNLOAD*
─────────────────────────
🎬 *Title:* ${data.title}
⏱️ *Duration:* ${data.timestamp}
📅 *Uploaded:* ${data.ago}
👀 *Views:* ${data.views.toLocaleString()}
🔗 *Watch:* ${data.url}
─────────────────────────
> ⬇️ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ɪɴ 192ᴋʙᴘꜱ... ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ...
`;

      await NazimX.sendMessage(
        from,
        { image: { url: data.thumbnail }, caption },
        { quoted: mek }
      );

      // Duration protection (max 30 mins)
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 +
            durationParts[1] * 60 +
            durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply(
          "> ⏳ ꜱᴏʀʀʏ! ᴀᴜᴅɪᴏ ꜰɪʟᴇꜱ ʟᴏɴɢᴇʀ ᴛʜᴀɴ 30 ᴍɪɴᴜᴛᴇꜱ ᴀʀᴇ ɴᴏᴛ ꜱᴜᴘᴘᴏʀᴛᴇᴅ"
        );
      }

      const quality = "192";
      const songData = await ytmp3(url, quality);

      await NazimX.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
          ptt: false
        },
        { quoted: mek }
      );

      return reply("> ✅ Song download completed successfully❗");
    } catch (e) {
      console.log("Song Error:", e);
      return reply(
        "> ❌ 🇸🇴🇲🇪🇹🇭🇮🇳🇬 🇼🇪🇳🇹 🇼🇷🇴🇳🇬 🇼🇭🇮🇱🇪 🇩🇴🇼🇳🇱🇴🇦🇩🇮🇳🇬 🇹🇭🇪 🇸🇴🇳🇬❗"
      );
    }
  }
);
