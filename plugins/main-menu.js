import fs from 'fs'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || '0'
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const _uptime = process.uptime() * 1000
    const uptime = clockString(_uptime)

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    const readMore = '\u200b'.repeat(850)

    await m.react('💜')

    const img = 'https://files.catbox.moe/6vv1s6.jpeg'

let tags = {};
let emojis = {
  main: "🔖",
info: "📄",
config: "⚙️",
dl: "🩸",
search: "🔍",
ia: "🤖",
ff: "🎰",
frases: "💘",
converter: "🌀",
tools: "🛠️",
gc: "🪼",
efectos: "🕯️",
fun: "🫟",
game: "🎮",
anime: "🩰",
maker: "🎠",
logos: "🕸️",
emox: "🧸",
nsfw: "🔞",
sticker: "🏵️",
rpg: "💰",
rg: "🌸",
owner: "💐"
};

const tagTitles = {
  main: "MENUS",
  info: "INFO",
  config: "AJUSTES",
  ventas: "ventas",
  dl: "DESCARGAS",
  search: "SEARCH",
  ia: "INTELIGENCIAS",
  ff: "FREE FIRE",
  frases: "FRASES",
  converter: "CONVERTES",
  tools: "HERRAMIENTAS",
  gc: "GRUPOS",
  efectos: "EFECTOS",
  fun: "DIVERSIÓN",
  game: "JUEGOS",
  anime: "RANDOM",
  maker: "MAKER",
  logos: "LOGOS",
  emox: "GIFS-NSFW",
  nsfw: "NSFW",
  sticker: "STICKER",
  rpg: "RPG",
  rg: "REGISTRO",
  owner: "OWNER"
};

for (let key in emojis) {
  tags[key] = `*${tagTitles[key]}*`;
}

    let defaultMenu = {


    before: `｡ﾟ○☆💜☆ᥫᩣαժαɾαᥫᩣ☆💜☆○ﾟ｡
     𓊆ྀི𝑴𝒆𝒏𝒖 𝑨𝒅𝒉𝒂𝒓𝒂 𝑩𝒐𝒕ྀི𓊇
𓂃 ࣪˖ ⋆.˚ ʚїɞ ⋆  ${taguser} ⋆. 𐙚 ˚
𝚃𝚎𝚗 𝚞𝚗/𝚞𝚗𝚊 ${saludo} ౨ৎ✨

\`ǫᴜᴇ ᴛᴜ ᴠɪᴅᴀ ʙʀɪʟʟᴇ ᴄᴏᴍᴏ ᴛᴜ sᴏɴʀɪsᴀ\` 🥺
${readMore}
`,

      header: category => `    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢\n             ${category}\n`,
      body: (cmd, emoji) => `𖦹°‧★${emoji} ${cmd}`,
      footer: '˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚\n',
      after: `> ${dev}`
  }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in emojis) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag].flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, emojis[tag]))).join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')


   await conn.sendMessage(m.chat, {
    image: { url: img },
    caption: menuText,
    mentions: [m.sender, creadorM],
    gifPlayback: true
  }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}


handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}