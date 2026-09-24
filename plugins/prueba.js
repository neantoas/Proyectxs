import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  try {

    // IMAGEN POR ENLACE
    let pp = 'https://files.catbox.moe/17wad0.jpg'

    let str = ``

    let fkontak2 = {
      key: {
        participants: '0@s.whatsapp.net',
        remoteJid: 'status@broadcast',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        contactMessage: {
          vcard: `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:y
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Ponsel
END:VCARD`
        }
      },
      participant: '0@s.whatsapp.net'
    }

    await conn.sendMessage(
      m.chat,
      {
        image: { url: pp },
        caption: str,
        mentions: []
      },
      {
        quoted: fkontak2
      }
    )

  } catch (e) {
    console.error('Error en comando das:', e)

    await conn.reply(
      m.chat,
      '*[❗𝐄𝐑𝐑𝐎𝐑❗] Ocurrió un error al ejecutar el comando.*',
      m
    )
  }
}

handler.command = /^(aletpreciostock)$/i
handler.exp = 50
handler.fail = null

export default handler
