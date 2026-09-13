import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['+522722581214', 'LeettsitaBot 🐼', true],
   ['+522722581214', 'LeettsitaBot', true],
   ['+522722581214','LeettsitaBot', true],
   ['+522722581214', 'LeettsitaBot', true],
]

global.creator = [
   ['+522722581214', 'LeettsitaBot 🐼', true]
]

global.mods = 
global.prems = 


global.packname = 'LeettsitaBot Bot MD'
global.botname = 'LeettsitaBot Bot'
global.wm = 'LeettsitaBot Bot - MD'
global.author = 'LeettsitaBot MD'
global.dev = 'LeettsitaBot Bot'
global.errorm = 'Error: ${error.message}'
global.namebot = 'LeettsitaBot'
global.nameai = 'LeettsitaBot Ai'
global.textbot = 'LeettsitaBot BOT MD'
global.textmain = 'LeettsitaBotBOT'
global.textmain2 = 'LeettsitaBot Bot MD'
global.vs = '2.1.0'
global.emotg = '🌷'
global.msgtagall = '𖥻 ׁ ׅ  𝘉𝘰𝘵 𝘣𝘺 @𝘭𝘦𝘦𝘵𝘵𝘴𝘪𝘵𝘢 ! ﹒🌷*\n. 🌷 ּ֯ ┆꒰ 𝘉𝘰𝘵 𝘚𝘦𝘳𝘷𝘪𝘤𝘦: .ᐟ ⨾\n↳ wa.me/+522722581214‬'
global.moneda = 'LeettsitaBotCoins'

global.sessions = 'LeettsitaBotSession'
global.jadi = 'JadiBots'
global.nameqr = 'LeettsitaBot'


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