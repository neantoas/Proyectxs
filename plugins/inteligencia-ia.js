import axios from 'axios'

// ================== CONFIGURACIÓN EVOGB ==================
const EVOGB_KEY = 'evogb-L1BrruwL'
const EVOGB_ENDPOINT = 'https://api.evogb.org/ai/claude'
// Nombre del parámetro donde va la pregunta (según tu panel: text / q / prompt / query)
const PARAM_TEXT = 'text'
// ==========================================================

let handler = async (m, { conn, usedPrefix, command, text }) => {
  const user = global.db.data.users[m.sender] || {}
  const gname = await conn.getName(m.sender)
  const name = user.registered && user.name ? user.name : gname
  const botName = typeof nameai !== 'undefined' ? nameai : 'IA'
  const emo = typeof emojis !== 'undefined' ? emojis : '✨'

  const basePrompt = `Eres una inteligencia artificial avanzada llamado ${botName}, desarrollado por Dev.Criss 🇦🇱. Eres amigable, ingenioso, divertido y muy curioso. Siempre hablas en español.

Te diriges a los usuarios por su nombre (en este caso: ${name}) y usas emojis apropiadamente según la emoción de tu respuesta. Respondes de manera clara, útil y con buena redacción.

Eres capaz de analizar textos y resolver dudas de todo tipo. Siempre intentas enriquecer la conversación. Evita respuestas innecesarias como "soy una IA" o "no tengo sentimientos". Tu prioridad es ayudar con respuestas útiles y exactas.`.trim()

  try {
    if (!text) {
      return conn.reply(m.chat, `*${emo} Escribe una pregunta para que la IA pueda ayudarte.*\n> *\`Ejemplo:\`* ${usedPrefix + command} ¿Cuánto es 4 + 4?`, m)
    }

    await conn.sendPresenceUpdate('composing', m.chat)

    const prompt = `${basePrompt}\n\n📌 Pregunta de ${name}: ${text}`
    const response = await askEvogb(prompt)
    return conn.reply(m.chat, response, m)

  } catch (error) {
    console.error('[IA ERROR]', error?.response?.data || error)
    return conn.reply(m.chat, `*✖️ Ocurrió un error:* ${error.message}`, m)
  }
}

handler.help = ['ia', 'ai', 'luminai']
handler.tags = ['ia']
handler.command = ['ia', 'ai', 'luminai']
export default handler

// Consulta a Evogb  ->  GET /ai/claude?key=...&text=...
async function askEvogb(prompt) {
  const res = await axios.get(EVOGB_ENDPOINT, {
    params: { key: EVOGB_KEY, [PARAM_TEXT]: prompt },
    timeout: 60000,
    validateStatus: () => true // para poder leer el mensaje de error de la API
  })

  const result = res.data?.result
  if (!res.data?.status || !result) {
    const motivo = res.data?.reason || res.data?.message || res.data?.msg || `HTTP ${res.status}`
    throw new Error(`La API no devolvió respuesta (${motivo})`)
  }

  return typeof result === 'string' ? result : JSON.stringify(result)
}