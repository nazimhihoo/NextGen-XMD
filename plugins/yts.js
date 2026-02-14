const { cmd } = require("../command");
const yts = require("yt-search");

cmd(
  {
    pattern: "yts",
    alias: ["yts", "ytsearch", "youtubesearch"],
    react: "🔎",
    desc: "_*Search YouTube videos*_",
    category: "search",
    filename: __filename,
  },
  async (
    NazimX,
    mek,
    m,
    {
      from,
      quoted,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("> *ℙ𝕝𝕖𝕒𝕤𝕖 𝕡𝕣𝕠𝕧𝕚𝕕𝕖 𝕒 𝕤𝕖𝕒𝕣𝕔𝕙 𝕢𝕦𝕖𝕣𝕪!* 🔍");

      reply("> *ꜱᴇᴀʀᴄʜɪɴɢ ʏᴏᴜᴛᴜʙᴇ ꜰᴏʀ ʏᴏᴜ...* ⏳");

      const search = await yts(q);

      if (!search || !search.all || search.all.length === 0) {
        return reply("> `*​🇳​​🇴​ ​🇷​​🇪​​🇸​​🇺​​🇱​​🇹​​🇸​ ​🇫​​🇴​​🇺​​🇳​​🇩​ ​🇴​​🇳​ ​🇾​​🇴​​🇺​​🇹​​🇺​​🇧​​🇪​*` 😒");
      }

      const results = search.videos.slice(0, 5); 
      let formattedResults = results.map((v, i) => (
        `📽️ *${i + 1}. ${v.title}*\n🪩 ${v.ago} | ⏳ ${v.timestamp} | 👀 ${v.views.toLocaleString()} views\n🖇️ ${v.url}`
      )).join("\n\n");

      const caption = `  
> _*Yₒᵤᵣ yₒᵤₜᵤbₑ ₛₑₐᵣcₕ ᵣₑₛᵤₗₜₛ*_
─────────────────────────
🔎 *Query*: ${q}
${formattedResults}
   `;

      await NazimX.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/nazimhihoo/NextGen-XMD/refs/heads/main/images/NextGen-MD.png",
          },
          caption,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("> `*𝔸𝕟 𝕖𝕣𝕣𝕠𝕣 𝕠𝕔𝕔𝕦𝕣𝕣𝕖𝕕 𝕨𝕙𝕚𝕝𝕖 𝕤𝕖𝕒𝕣𝕔𝕙𝕚𝕟𝕘 𝕐𝕠𝕦𝕋𝕦𝕓𝕖*` ✖️");
    }
  }
);
