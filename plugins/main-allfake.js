import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

let pp = ''
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender

//CREADOR Y OTROS
global.creadorN = '51992621601';
global.creadorM = global.creadorN + '@s.whatsapp.net';
global.botreal = `${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}`
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/51992621601'

//REACCIONES 
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'

//EMOJIS PREDETERMINADOS
global.emoji = '💜'
global.emoji2 = '🐣'
global.emoji3 = '🦋'
global.emoji4 = '🐳'
global.emoji5 = '🦦'
global.emojis = [emoji, emoji2, emoji3, emoji4, emoji5].getRandom()

//EMOJIS INFORMATIVOS
global.warn = '⚠️'
global.mistake = '❌'
global.info = 'ℹ️'

//MENSAJE DE ESPERA 
global.wait = '*⏳ Aguarde un momento...*';
global.hotw = '*🔥 Los comandos nsfw están desactivados para este chat.*';

//ENLACES
var grupo = 'https://chat.whatsapp.com/GY3eZyNH80ZFGds07ZYTgh'
var web = 'https://yancito-bot.vercel.app/' 
let instagram = 'https://www.instagram.com/aleizn'

global.redes = [grupo, web, instagram].getRandom()

//TIEMPO
var ase = moment().tz('America/Lima'); // Cambia 'America/Lima' por la zona horaria deseada
var hour = ase.hour(); // Obtiene la hora en la zona horaria elegida

switch(hour) { 
    case 0: case 1: case 2:
        hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; 
        break;
    case 3: case 4: case 5: case 6:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; 
        break;
    case 7:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; 
        break;
    case 8: case 9:
        hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; 
        break;
    case 10: case 11: case 12: case 13:
        hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; 
        break;
    case 14: case 15: case 16: case 17:
        hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌇'; 
        break;
    case 18: case 19: case 20: case 21: case 22: case 23:
        hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; 
        break;
}

global.saludo = hour;

// FECHA Y HORA EN FORMATO PERSONALIZADO (ZONA HORARIA PERÚ)
var fecha = moment().tz('America/Lima');
var diaSemana = fecha.locale('es').format('dddd'); // Día de la semana en español
var dia = fecha.format('D'); // Día del mes
var mes = fecha.locale('es').format('MMMM'); // Mes en español
var año = fecha.format('YYYY'); // Año
var hora = fecha.format('h:mm A'); // Hora con AM/PM

// Capitalizar primera letra del día y el mes
diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
mes = mes.charAt(0).toUpperCase() + mes.slice(1);

global.fechaHora = `${diaSemana}, ${dia} de ${mes} del ${año} │ Hora: ${hora}`;

//TAGS & STICKERS

 global.usnamebot = await conn.getName(conn.user.id)

  // Nombre personalizado si está registrado, si no, nombre por defecto
  const gname = await conn.getName(m.sender)
  const user = global.db.data?.users?.[m.sender] || {}
  global.usname = user.registered && user.name ? user.name : gname

  // Separador invisible
  const more = String.fromCharCode(8206)
  global.readMore = more.repeat(850)

  // Paquete y autor estilizado
  global.packN = `𐚁๋࣭⭑ֶָ֢ ${global.botname} 𐚁๋࣭⭑ֶָ֢\n\n⋄ @${global.usname} ⋄\n𓂃𓂂𖡼.𖤣𖥧𓈒◌܀𖥧𖧧 ˒˒.·˚ ₊˚ˑ𓆸`
  global.authorN = dev

/*
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.authN = `ꘓꘓ aleizn Bot`;

global.packN= `ꘓꘓ  𝖲ᥙᥒ𝖿͟ᥣ͟ᥲ𝗋ᥱࣲ 𝖳ᥱᥲ𝗆  彡`*/

//FAKES
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363318267632676@newsletter', newsletterName: "˚₊·͟͟͟͟͟͟͞͞͞͞͞͞Sunflare - Team ೃ࿔₊•", serverMessageId: -1 }
}}, { quoted: m }

//ID CANALES
global.idchannel = '120363357231409846@newsletter'
global.canalIdM = ["120363357231409846@newsletter", "120363377595441592@newsletter", "120363318267632676@newsletter"]
global.canalNombreM = ["𝑺𝒊𝒈𝒖𝒆 𝒆𝒍 𝑪𝒂𝒏𝒂𝒍 𝒃𝒚 𝑱𝒐𝒕𝒂 🐼", "𝐀𝐥𝐞𝐢𝐳𝐧 𝐁𝐨𝐭 🌹", "⏤͟͟͞͞🌤️ 𝐀𝐥𝐞𝐢𝐳𝐧 𝐁𝐨𝐭"]
global.channelRD = await getRandomChannel()
// global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "3876577197-120363302285079181@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: `${packname}`, orderTitle: 'Bang', thumbnail: icons, sellerJid: '0@s.whatsapp.net'}}}

global.icono = [
'https://files.catbox.moe/w3zmi3.jpg',
'https://files.catbox.moe/2i4z53.jpg',
'https://files.catbox.moe/853hf2.jpg',
'https://files.catbox.moe/1cdqt2.jpg',
'https://files.catbox.moe/uogbz0.jpg',
'https://files.catbox.moe/szj9o8.jpg',
].getRandom()

global.urls = [
"https://qu.ax/vnPMj.mp4",
"https://qu.ax/vnPMj.mp4",
];
let gifUrl = urls[Math.floor(Math.random() * urls.length)];

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, }, }}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}         