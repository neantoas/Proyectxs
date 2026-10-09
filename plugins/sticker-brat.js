import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*✦ Ingresa un texto para realizar tu sticker de Brat.*\n> *Ejemplo:* ${usedPrefix + command} Hola mundo`, m)
  }

  m.react('⏳')

  try {
    // Usamos la API estable de Brat
    let url = `https://skyzxu-brat.hf.space/brat?text=${encodeURIComponent(text)}`
    let res = await axios.get(url, { responseType: 'arraybuffer' })

    let contentType = res.headers['content-type'] || ''

    // Validamos que la respuesta sea una imagen válida
    if (!['image/png', 'image/jpeg', 'application/octet-stream'].includes(contentType) && !contentType.includes('image')) {
      throw new Error(`Contenido inesperado: ${contentType}`)
    }

    let bratSticker = await sticker(res.data, null, global.packname, global.author)

    await conn.sendMessage(m.chat, { sticker: bratSticker }, { quoted: m })
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.react('✖️')
    m.reply(`*✖️ Error:* ${err.message}`)
  }
}

handler.help = ['brat']
handler.command = ['brat']
handler.tags = ['sticker']

export default handler