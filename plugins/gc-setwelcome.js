import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'

const fkontak = {
  key: {
    participants: "0@s.whatsapp.net",
    remoteJid: "status@broadcast",
    fromMe: false,
    id: "Bienvenida"
  },
  message: {
    contactMessage: {
      displayName: "KaisenBot🐼",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:KaisenBot🐼\nORG:KaisenBot\nTEL;type=CELL;type=VOICE;waid=00000000000:+00 00000000\nEND:VCARD`
    }
  }
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let defaultImage = 'https://files.catbox.moe/0qlgsr.jpg'
  let dev = 'KaisenBot'

  if (!chat.customWelcome) chat.customWelcome = null
  if (!chat.customBye) chat.customBye = null
  if (chat.welcome === undefined) chat.welcome = true

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
    
    // 1. Enviamos la bienvenida asegurando que pertenezca al chat del grupo (sin usar remoteJid de status)
    await conn.sendMessage(
      m.chat,
      { image: img, caption: bienvenida, mentions: [who] },
      { quoted: { key: { remoteJid: m.chat, fromMe: false, id: m.id, participant: who }, message: { conversation: bienvenida } } }
    )

    // 2. Envía el audio de bienvenida
    let rutaAudioBienvenida = './audios/bienvenida.mp3'
    if (fs.existsSync(rutaAudioBienvenida)) {
      await conn.sendMessage(
        m.chat,
        {
          audio: fs.readFileSync(rutaAudioBienvenida),
          mimetype: 'audio/mpeg',
          ptt: false
        },
        { quoted: m }
      )
    }

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
      { quoted: { key: { remoteJid: m.chat, fromMe: false, id: m.id, participant: who }, message: { conversation: bye } } }
    )

    let rutaAudioDespedida = './audios/despedida.mp3'
    if (fs.existsSync(rutaAudioDespedida)) {
      await conn.sendMessage(
        m.chat,
        {
          audio: fs.readFileSync(rutaAudioDespedida),
          mimetype: 'audio/mpeg',
          ptt: false
        },
        { quoted: m }
      )
    }
  }

  return true
}