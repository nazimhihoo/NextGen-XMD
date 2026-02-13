const { cmd, commands } = require("../command");
const getFbVideoInfo = require("@xaviabot/fb-downloader");

cmd(
  {
    pattern: "fb",
    alias: ["facebook", "fbdownload", "fbd"],
    react: "✅",
    desc: "> Dₒwₙₗₒₐd Fₐcₑbₒₒₖ ᵥᵢdₑₒ",
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
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("> *​🇵​​🇱​​🇪​​🇦​​🇸​​🇪​ ​🇵​​🇷​​🇴​​🇻​​🇮​​🇩​​🇪​ ​🇦​ ​🇻​​🇦​​🇱​​🇮​​🇩​ ​🇫​​🇦​​🇨​​🇪​​🇧​​🇴​​🇴​​🇰​ ​🇻​​🇮​​🇩​​🇪​​🇴​ ​🇺​​🇷​​🇱​❗* ❤️");

      const fbRegex = /(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.+/;
      if (!fbRegex.test(q))
        return reply("> *𝕀𝕟𝕧𝕒𝕝𝕚𝕕 𝔽𝕒𝕔𝕖𝕓𝕠𝕠𝕜 𝕌ℝ𝕃! ℙ𝕝𝕖𝕒𝕤𝕖 𝕔𝕙𝕖𝕔𝕜 𝕒𝕟𝕕 𝕥𝕣𝕪 𝕒𝕘𝕒𝕚𝕟.* ☹️");

      reply("> *𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙫𝙞𝙙𝙚𝙤...* ❤️");

      const result = await getFbVideoInfo(q);
      if (!result || (!result.sd && !result.hd)) {
        return reply("> *𝙁𝙖𝙞𝙡𝙚𝙙 𝙩𝙤 𝙙𝙤𝙬𝙣𝙡𝙤𝙖𝙙 𝙫𝙞𝙙𝙚𝙤. 𝙋𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣 𝙡𝙖𝙩𝙚𝙧.* ☹️");
      }

      const { title, sd, hd } = result;
      const bestQualityUrl = hd || sd;
      const qualityText = hd ? "HD" : "SD";

      const desc = `
*Y̳o̳u̳r̳ ̳f̳b̳ ̳v̳i̳d̳e̳o̳*
👻 *Title*: ${title || "Unknown"}
👻 *Quality*: ${qualityText}
`;

      await NazimX.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/nazimhihoo/NextGen-XMD/blob/main/images/NextGen-MD.png",
          },
          caption: desc,
        },
        { quoted: mek }
      );

      await NazimX.sendMessage(
        from,
        {
          video: { url: bestQualityUrl },
          caption: `*📥 Downloaded ${qualityText} quality*`,
        },
        { quoted: mek }
      );

      return reply("𝗧𝗵𝗮𝗻𝗸 𝘆𝗼𝘂 𝗳𝗼𝗿 𝘂𝘀𝗶𝗻𝗴 𝗡𝗲𝘅𝘁𝗚𝗲𝗻-𝗫𝗠𝗗");
    } catch (e) {
      console.error(e);
      reply(`*Error:* ${e.message || e}`);
    }
  }
);
