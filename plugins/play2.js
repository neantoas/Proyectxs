import yts from 'yt-search'
import axios from 'axios'

// ================== CONFIGURACIÓN EVOGB ==================
const EVOGB_KEY = 'evogb-kOXevp1J'
const EVOGB_ENDPOINT = 'https://api.evogb.org/dl/ytmp4'
const MAX_SEGUNDOS = 600 // 10 minutos
// ==========================================================

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*✨ Por favor, ingresa el nombre del video que deseas buscar.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Bad Bunny - Monaco`, m)
  }

  m.react('⏳')

  try {
    // 1. Buscar en YouTube
    const search = await yts(text)
    if (!search || !search.videos.length) {
      m.react('✖️')
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m)
    }

    const { title, thumbnail, timestamp, url, author, seconds } = search.videos[0]

    // Límite de duración
    if (seconds > MAX_SEGUNDOS) {
      m.react('✖️')
      return conn.reply(m.chat, `⚠️ Ese video dura *${timestamp}* y el máximo permitido es 10 minutos.`, m)
    }

    const infoText = `🎬 *YOUTUBE - PLAY2 (MP4)* 🎬\n\n` +
                     `📌 *Título:* ${title}\n` +
                     `⏱️ *Duración:* ${timestamp}\n` +
                     `👤 *Canal:* ${author.name}\n\n` +
                     `_Descargando video, por favor espera..._`

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: infoText }, { quoted: m })

    // 2. Pedir el MP4 a Evogb
    const res = await axios.get(EVOGB_ENDPOINT, {
      params: { key: EVOGB_KEY, url },
      timeout: 120000,
      validateStatus: () => true
    })

    const downloadUrl = res.data?.data?.dl

    if (!res.data?.status || !downloadUrl) {
      const motivo = res.data?.reason || res.data?.message || res.data?.msg || `HTTP ${res.status}`
      throw new Error(`La API no devolvió enlace de descarga (${motivo})`)
    }

    const calidad = res.data?.data?.quality || ''

    // 3. Enviar el video (primero por URL; si falla, descarga el archivo y lo envía)
    try {
      await conn.sendMessage(m.chat, {
        video: { url: downloadUrl },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: `🎬 *${title}*${calidad ? `\n📺 Calidad: ${calidad}` : ''}`
      }, { quoted: m })
    } catch {
      const file = await axios.get(downloadUrl, { responseType: 'arraybuffer', timeout: 180000 })
      await conn.sendMessage(m.chat, {
        video: Buffer.from(file.data),
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: `🎬 *${title}*${calidad ? `\n📺 Calidad: ${calidad}` : ''}`
      }, { quoted: m })
    }

    m.react('✅')
  } catch (err) {
    console.error('[PLAY2 ERROR]', err?.response?.data || err)
    m.react('✖️')
    m.reply(`✖️ Ocurrió un error al procesar el video: ${err.message}`)
  }
}

handler.help = ['play2 <texto>']
handler.command = ['play2', 'video', 'ytmp4']
handler.tags = ['downloader']

export default handler