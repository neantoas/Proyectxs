import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
   await m.react('💜');

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let name = await conn.getName(who);
    let username = conn.getName(m.sender);

    // VCARD
    let list = [{
        displayName: "aleizn💜",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:aleizn💜
\nitem1.TEL;waid=51992621601:51992621601\nitem1.X-ABLabel:Número\nitem2.EMAIL;type=INTERNET: lucxxs.qzy.vx@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://www.instagram.com/lucxxs.qzy\nitem3.X-ABLabel:Internet\nitem4.ADR:;; Argentina 🇦🇷;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
    }];

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Contacto`,
            contacts: list
        }
    }, {
        quoted: m
    });

    let txt = `👋 *Hola \`${username}\` este es*\n*el contacto de mi creador*`;

    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });
};

handler.help = ['owner'];
handler.tags = ['info'];
handler.command = /^(owner|creator|creador|dueño)$/i;

export default handler;