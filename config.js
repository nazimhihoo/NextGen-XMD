const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "",
ALIVE_IMG: process.env.ALIVE_IMG || "https://github.com/nazimhihoo/NextGen-XMD/blob/main/images/NextGen-MD.png",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hay👋 NextGen-MD Is Alive Now😍*",
BOT_OWNER: '923229168159',  // Replace with the owner's phone number



};
