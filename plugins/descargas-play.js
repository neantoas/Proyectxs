import yts from 'yt-search'
import axios from 'axios'

// ================== CONFIGURACIÓN EVOGB ==================
const EVOGB_KEY = 'evogb-L1BrruwL'
const EVOGB_ENDPOINT = 'https://api.evogb.org/dl/ytmp3'
// ==========================================================

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*✨ Por favor, ingresa el nombre de la canción o video que deseas buscar.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Bad Bunny - Monaco`, m)
  }

  m.react('⏳')

  try {
    // 1. Buscar en YouTube
    const search = await yts(text)
    if (!search || !search.videos.length) {
      m.react('✖️')
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m)
    }

    const { title, thumbnail, timestamp, url, author } = search.videos[0]

    const infoText = `🎵 *YOUTUBE - PLAY (MP3)* 🎵\n\n` +
                     `📌 *Título:* ${title}\n` +
                     `⏱️ *Duración:* ${timestamp}\n` +
                     `👤 *Canal:* ${author.name}\n\n` +
                     `_Descargando audio, por favor espera..._`

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: infoText }, { quoted: m })

    // 2. Pedir el MP3 a Evogb  ->  GET /dl/ytmp3?key=...&url=...
    const res = await axios.get(EVOGB_ENDPOINT, {
      params: { key: EVOGB_KEY, url },
      timeout: 90000,
      validateStatus: () => true // para poder leer el mensaje de error de la API
    })

    const downloadUrl = res.data?.data?.dl

    if (!res.data?.status || !downloadUrl) {
      const motivo = res.data?.reason || res.data?.message || res.data?.msg || `HTTP ${res.status}`
      throw new Error(`La API no devolvió enlace de descarga (${motivo})`)
    }

    // 3. Enviar el audio (primero por URL; si falla, descarga el archivo y lo envía)
    try {
      await conn.sendMessage(m.chat, {
        audio: { url: downloadUrl },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        ptt: false
      }, { quoted: m })
    } catch {
      const file = await axios.get(downloadUrl, { responseType: 'arraybuffer', timeout: 120000 })
      await conn.sendMessage(m.chat, {
        audio: Buffer.from(file.data),
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
        ptt: false
      }, { quoted: m })
    }

    m.react('✅')
  } catch (err) {
    console.error('[PLAY ERROR]', err?.response?.data || err)
    m.react('✖️')
    m.reply(`✖️ Ocurrió un error al procesar el audio: ${err.message}`)
  }
}

handler.help = ['play <texto>']
handler.command = ['play', 'cancion', 'audio']
handler.tags = ['downloader']

export default handler