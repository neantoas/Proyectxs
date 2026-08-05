let mutedUsers = new Set();

// Lista de owners y número del bot
const ownerNumbersRaw = [
    "51992621601",
    "51992621601",
    "51992621601"
];
const botNumberRaw = "5493885926112";

// Función para normalizar JID
function normalizeJid(jid) {
    if (!jid) return null;
    let digits = jid.replace(/[^0-9]/g, '');
    return digits ? digits + '@s.whatsapp.net' : null;
}

// Normalizamos owners y bot
const ownerNumbers = ownerNumbersRaw.map(n => normalizeJid(n));
const botNumber = normalizeJid(botNumberRaw);

let handler = async (m, { conn, usedPrefix, command, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) return conn.reply(m.chat, '🤦‍♂️ *El bot necesita ser administrador.*', m);
    if (!isAdmin) return conn.reply(m.chat, '*🫠 Este comando es solo para admins.*', m);

    let user;
    if (m.quoted) {
        user = m.quoted.sender;
    } else {
        return conn.reply(m.chat, '🫧 *Debes responder al mensaje de la persona que quieres mutear/desmutear.*', m);
    }

    const normalizedUser = normalizeJid(user);

    // Validación: no se puede mutear a ningún owner ni al bot
    if (ownerNumbers.includes(normalizedUser)) {
        return conn.reply(m.chat, '👑 *No puedes mutear al propietario del bot.*', m);
    }
    if (normalizedUser === botNumber) {
        return conn.reply(m.chat, '🤖 *No puedes mutear al bot.*', m);
    }

    if (command === "mute") {
        mutedUsers.add(normalizedUser);
        conn.reply(m.chat, `🔇 *Usuario muteado:* @${normalizedUser.split('@')[0]}\n> tus mensajes serán eliminados.`, m, { mentions: [normalizedUser] });
    } else if (command === "unmute") {
        // Bloquear que un usuario muteado se desmutee a sí mismo
        if (normalizedUser === normalizeJid(m.sender)) {
            return conn.reply(m.chat, `🚫 *No puedes desmutearte a ti mismo.*`, m);
        }

        mutedUsers.delete(normalizedUser);
        conn.reply(m.chat, `🔊 *Usuario desmuteado:* @${normalizedUser.split('@')[0]}\n> tus mensajes ya no serán eliminados.`, m, { mentions: [normalizedUser] });
    }
};

// Capa extra de protección en handler.before
handler.before = async (m, { conn }) => {
    const normalizedSender = normalizeJid(m.sender);

    // Nunca borrar mensajes de owners ni del bot
    if (ownerNumbers.includes(normalizedSender) || normalizedSender === botNumber) return;

    if (mutedUsers.has(normalizedSender) && m.mtype !== 'stickerMessage') {
        // Bloquear ejecución de comandos mute/unmute de usuarios muteados
        if (/^(\.|!|\/)(mute|unmute)/i.test(m.text)) {
            console.log("Bloqueado intento de comando de usuario muteado:", normalizedSender, m.text);
            return; // No dejar que llegue al handler principal
        }

        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute', 'unmute'];
handler.tags = ['group'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;