const { cmd, commands } = require('../command');
const config = require('../config');

cmd({
    pattern: "alive",
    desc: "> C̳h̳e̳c̳k̳ ̳b̳o̳t̳ ̳o̳n̳l̳i̳n̳e̳ ̳o̳r̳ ̳n̳o̳",
    category: "main",
    filename: __filename
},
async (NazimX, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup,
    sender, senderNumber, botNumber2, botNumber, pushname,
    isMe, isOwner, groupMetadata, groupName, participants,
    groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        return await NazimX.sendMessage(from, {
            image: { url: config.ALIVE_IMG || "https://github.com/nazimhihoo/NextGen-XMD/blob/main/images/NextGen-MD.png" },
            caption: config.ALIVE_MSG || "> ✅ ᗷOT Iᔕ OᑎᒪIᑎE ᗩᑎᗪ ᖇEᗩᗪY!"
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
