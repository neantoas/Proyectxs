import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['+51992621601', 'AleiznBot 🐼', true],
   ['+51992621601', 'AleiznBot', true],
   ['+51992621601','AleiznBot', true],
   ['+51992621601', 'AleiznBot', true],
]

global.creator = [
   ['+51992621601', 'AleiznBot 🐼', true]
]

global.mods = 
global.prems = 


global.packname = 'AleiznBot Bot MD'
global.botname = 'AleiznBot Bot'
global.wm = 'AleiznBot Bot - MD'
global.author = 'AleiznBot MD'
global.dev = 'AleiznBot Bot'
global.errorm = 'Error: ${error.message}'
global.namebot = 'AleiznBot'
global.nameai = 'AleiznBot Ai'
global.textbot = 'AleiznBot BOT MD'
global.textmain = 'AleiznBotBOT'
global.textmain2 = 'AleiznBot Bot MD'
global.vs = '2.1.0'
global.emotg = '🌷'
global.msgtagall = '𖥻 ׁ ׅ  𝘉𝘰𝘵 𝘣𝘺 @𝘭𝘦𝘦𝘵𝘵𝘴𝘪𝘵𝘢 ! ﹒🌷*\n. 🌷 ּ֯ ┆꒰ 𝘉𝘰𝘵 𝘚𝘦𝘳𝘷𝘪𝘤𝘦: .ᐟ ⨾\n↳ wa.me/+51992621601‬'
global.moneda = 'AleiznBotCoins'

global.sessions = 'AleiznBotSession'
global.jadi = 'JadiBots'
global.nameqr = 'AleiznBot'


global.catalogo = fs.readFileSync('./media/catalogo.jpg')


global.grupo = 
global.comu = 
global.channel = 
global.ig = 


global.estilo = 


global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


global.multiplier = 69 
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})