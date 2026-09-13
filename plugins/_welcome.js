import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

// contacto citado como fkontak
const fkontak = {
  key: {
    participants: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "Bienvenida"
  },
  message: {
    contactMessage: {
      displayName: "LeettsitaBotBot🐼",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:LeettsitaBotBot🐼\nORG:LeettsitaBotBot\nTEL;type=CELL;type=VOICE;waid=00000000000:+00 00000000\nEND:VCARD`
    }
  }
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/x8x160.jpg'
  let dev = 'LeettsitaBot Bot'

  if (!chat.customWelcome) chat.customWelcome = null
  if (!chat.customBye) chat.customBye = null
  if (chat.welcome === undefined) chat.welcome = true

  // Si el sistema de bienvenida está desactivado, no hacer nada
  if (!chat.welcome) return true

  let img
  try {
    let pp = await conn.profilePictureUrl(who, 'image')
    img = await (await fetch(pp)).buffer()
  } catch {
    img = await (await fetch(defaultImage)).buffer()
  }

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = chat.customWelcome
      ? chat.customWelcome.replace(/@user/g, taguser).replace(/@group/g, groupMetadata.subject)
      : `૮₍⸝⸝> ̫ <⸝⸝₎ა ♡ ¡Holaaa ${taguser} !
Bienvenid@ a *${groupMetadata.subject}* 🌸

🌷✨ Qué ternura tenerte por aquí.
Espero que tu estancia sea súper linda y te sientas como en casa. 🍡💕

> ${dev}`
    await conn.sendMessage(
      m.chat,
      { image: img, caption: bienvenida, mentions: [who] },
      { quoted: fkontak } // aquí va el contacto citado
    )
  } else if (
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE ||
    m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE
  ) {
    let bye = chat.customBye
      ? chat.customBye.replace(/@user/g, taguser).replace(/@group/g, groupMetadata.subject)
      : `૮₍ • ᴥ • ₎ა ♡ ¡Hasta pronto ${taguser} !
Gracias por estar en *${groupMetadata.subject}* 🌸

🌷✨ Fue muy lindo tenerte por aquí.
Te mando vibras suaves y un abrazo lleno de ternurita. 🍡💕

> ${dev}`
    await conn.sendMessage(
      m.chat,
      { image: img, caption: bye, mentions: [who] },
      { quoted: fkontak } // aquí también
    )
  }

  return true
}