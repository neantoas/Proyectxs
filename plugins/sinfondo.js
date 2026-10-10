import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
  // Identificamos si el usuario envió una imagen o está respondiendo a una
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''

  if (!mime || !mime.includes('image')) {
    return conn.reply(
      m.chat, 
      `*✦ Por favor, envía una imagen o responde a una con el comando:* \`${usedPrefix + command}\``, 
      m
    )
  }

  m.react('⏳')

  try {
    // 1. Descargamos la imagen directamente como un Buffer
    let media = await q.download()

    if (!media) {
      throw new Error('No se pudo descargar la imagen.')
    }

    // 2. Preparamos el formulario con la imagen para enviarla a Remove.bg
    let formData = new FormData()
    formData.append('image_file', media, { filename: 'image.png' })
    formData.append('size', 'auto')

    // 3. Realizamos la petición POST usando axios con tu API Key integrada
    let response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'jqUPdXboZJH47nfS2EAo4PNN'
      }
    })

    // 4. Convertimos la respuesta en un Buffer listo para enviar
    let bufferSinFondo = Buffer.from(response.data)

    // 5. Enviamos la imagen limpia de vuelta al chat
    await conn.sendMessage(m.chat, { 
      image: bufferSinFondo, 
      caption: '✅ ¡Listo! Aquí tienes tu imagen sin fondo.' 
    }, { quoted: m })

    m.react('✅')

  } catch (err) {
    console.error(err)
    m.react('✖️')
    let errorMsg = err.response ? Buffer.from(err.response.data).toString() : err.message
    conn.reply(m.chat, `*✖️ Error al quitar el fondo:* ${errorMsg}`, m)
  }
}

handler.help = ['sinfondo']
handler.command = ['sinfondo', 'quitarfondo']
handler.tags = ['tools', 'edit']

export default handler