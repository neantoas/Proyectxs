import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['51992621601', 'aleizn 🐼', true],
   ['51992621601', 'Aleizn', true],
   ['51992621601','Aleizn', true],
   ['51992621601', 'Aleizn', true],
]

global.creator = [
   ['51992621601', 'aleizn 🐼', true]
]

global.mods = 
global.prems = 


global.packname = 'Aleizn Bot MD'
global.botname = 'Aleizn Bot'
global.wm = 'Aleizn Bot - MD'
global.author = 'Aleizn MD'
global.dev = 'Aleizn Bot'
global.errorm = 'Error: ${error.message}'
global.namebot = 'Aleizn'
global.nameai = 'Aleizn Ai'
global.textbot = 'Aleizn BOT MD'
global.textmain = 'AleiznBOT'
global.textmain2 = 'Aleizn Bot MD'
global.vs = '2.1.0'
global.emotg = '💜'
global.msgtagall = '💜⋆ 𝗘𝗧𝗜𝗤𝗨𝗘𝗧𝗔 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 ⋆💜\n🛍️𝗔𝗱𝗾𝘂𝗶𝗲𝗿𝗲 𝗲𝗹 𝗯𝗼𝘁 𝗰𝗼𝗻 ⨾\n↳ wa.me/51992621601‬'
global.moneda = 'AleiznCoins'

global.sessions = 'AleiznSession'
global.jadi = 'JadiBots'
global.nameqr = 'Aleizn'


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