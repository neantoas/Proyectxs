import yts from 'yt-search'
import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*✨ Por favor, ingresa el nombre de la canción o video que deseas buscar.*\n> *\`Ejemplo:\`* ${usedPrefix + command} Bad Bunny - Monaco`, m)
  }

  m.react('⏳')

  try {
    // 1. Buscar la canción en YouTube
    const search = await yts(text)
    if (!search || !search.videos.length) {
      m.react('✖️')
      return conn.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m)
    }

    const song = search.videos[0]
    const { title, thumbnail, timestamp, url, author } = song

    let infoText = `🎵 *YOUTUBE - PLAY (MP3)* 🎵\n\n` +
                   `📌 *Título:* ${title}\n` +
                   `⏱️ *Duración:* ${timestamp}\n` +
                   `👤 *Canal:* ${author.name}\n\n` +
                   `_Descargando audio, por favor espera..._`

    // Enviar la miniatura con los datos de la canción
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: infoText }, { quoted: m })

    // 2. Endpoint actualizado con mode=link y tu apikey
    let apiUrl = `https://dv-yer-api.online/ytmp3?mode=link&url=${encodeURIComponent(url)}&apikey=dvyer119038896862`
    
    // 3. Petición a la nueva API
    let res = await axios.get(apiUrl)
    
    // Capturar el enlace de descarga del audio desde la estructura de respuesta
    let downloadUrl = res.data.result?.download || res.data.result || res.data.url || res.data.download

    if (!downloadUrl) {
      throw new Error('La API no devolvió un enlace de descarga de audio válido.')
    }

    // 4. Enviar el archivo como audio MP3 al chat de WhatsApp
    await conn.sendMessage(m.chat, { 
        audio: { url: downloadUrl }, 
        mimetype: 'audio/mpeg',
        ptt: false // Cambia a true si prefieres que se envíe como nota de voz
    }, { quoted: m })

    m.react('✅')
  } catch (err) {
    console.error(err)
    m.react('✖️')
    m.reply(`✖️ Ocurrió un error al procesar el audio: ${err.message}`)
  }
}

handler.help = ['play <texto>']
handler.command = ['play', 'cancion', 'audio']
handler.tags = ['downloader']

export default handler