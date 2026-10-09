import { sticker } from '../lib/sticker.js'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { spawn } from 'child_process'
import { existsSync, promises as fs } from 'fs'
import { createRequire } from 'module'
import { randomUUID } from 'crypto'
import { tmpdir } from 'os'
import path from 'path'

const require = createRequire(import.meta.url)
let ffmpegBin = 'ffmpeg'
try {
  const bin = require('ffmpeg-static')
  if (bin && existsSync(bin)) ffmpegBin = bin
} catch {}

const SIZE = 512
const PADDING = 28
const NARROW = 0.84
const MAX_FONT = 190
const MIN_FONT = 22
const MIN_UNBROKEN_FONT = 56
const LINE_HEIGHT = 1.08
const MAX_FRAMES = 13
const FRAME_SECONDS = 0.6
const HOLD_FRAMES = 3

const FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/arimo/Arimo%5Bwght%5D.ttf'
const FONT_FILES = [
  '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
  '/usr/share/fonts/truetype/msttcorefonts/Arial.ttf',
  'C:\\Windows\\Fonts\\arial.ttf',
]
let fontFamily = 'sans-serif'
let fontReady = null

const loadFont = async () => {
  for (const file of FONT_FILES) {
    if (existsSync(file) && GlobalFonts.registerFromPath(file, 'BratFont')) return 'BratFont'
  }
  const res = await fetch(FONT_URL, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`No se pudo cargar la letra (${res.status})`)
  if (!GlobalFonts.register(Buffer.from(await res.arrayBuffer()), 'BratFont')) throw new Error('No se pudo cargar la letra')
  return 'BratFont'
}

const ensureFont = async () => {
  fontReady ||= loadFont().catch((err) => { fontReady = null; throw err })
  fontFamily = await fontReady
}

const splitLongWord = (ctx, word, maxWidth) => {
  const parts = []
  let current = ''
  for (const char of Array.from(word)) {
    if (current && ctx.measureText(current + char).width > maxWidth) {
      parts.push(current)
      current = char
    } else current += char
  }
  if (current) parts.push(current)
  return parts
}

const wrapWords = (ctx, words, maxWidth, breakWords) => {
  const lines = []
  let current = ''
  for (const word of words) {
    const pieces = ctx.measureText(word).width > maxWidth ? (breakWords ? splitLongWord(ctx, word, maxWidth) : null) : [word]
    if (!pieces) return null
    for (const piece of pieces) {
      const candidate = current ? `${current} ${piece}` : piece
      if (current && ctx.measureText(candidate).width > maxWidth) {
        lines.push(current)
        current = piece
      } else current = candidate
    }
  }
  if (current) lines.push(current)
  return lines
}

const fitLayout = (ctx, words) => {
  const maxWidth = (SIZE - PADDING * 2) / NARROW
  const maxHeight = SIZE - PADDING * 2
  for (const breakWords of [false, true]) {
    const smallest = breakWords ? MIN_FONT : MIN_UNBROKEN_FONT
    for (let fontSize = MAX_FONT; fontSize >= smallest; fontSize -= 2) {
      ctx.font = `${fontSize}px "${fontFamily}"`
      const lines = wrapWords(ctx, words, maxWidth, breakWords)
      if (lines && lines.length * fontSize * LINE_HEIGHT <= maxHeight) return { fontSize, lines }
    }
  }
  ctx.font = `${MIN_FONT}px "${fontFamily}"`
  const maxLines = Math.floor(maxHeight / (MIN_FONT * LINE_HEIGHT))
  return { fontSize: MIN_FONT, lines: (wrapWords(ctx, words, maxWidth, true) || []).slice(0, maxLines) }
}

const renderFrame = (words) => {
  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, SIZE, SIZE)
  const { fontSize, lines } = fitLayout(ctx, words)
  ctx.font = `${fontSize}px "${fontFamily}"`
  ctx.fillStyle = '#000000'
  ctx.textBaseline = 'top'
  ctx.save()
  ctx.translate(PADDING, PADDING)
  ctx.scale(NARROW, 1)
  lines.forEach((line, i) => ctx.fillText(line, 0, i * fontSize * LINE_HEIGHT))
  ctx.restore()
  return canvas.encode('png')
}

const runFfmpeg = (args) => new Promise((resolve, reject) => {
  const child = spawn(ffmpegBin, args)
  let errorText = ''
  child.stderr.on('data', (chunk) => { errorText += chunk.toString() })
  child.on('error', reject)
  child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(errorText.trim() || `ffmpeg terminó con código ${code}`))))
})

const frameGroups = (words) => {
  const step = Math.ceil(words.length / MAX_FRAMES)
  const frames = []
  for (let end = step; end < words.length; end += step) frames.push(words.slice(0, end))
  frames.push(words)
  return frames
}

const generateBratVideo = async (text) => {
  const words = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
  if (!words.length) throw new Error('Texto vacío')
  await ensureFont()
  const dir = path.join(tmpdir(), `bratvid-${Date.now()}-${randomUUID()}`)
  await fs.mkdir(dir, { recursive: true })
  try {
    const frames = [...frameGroups(words), ...Array(HOLD_FRAMES).fill(words)]
    for (const [i, group] of frames.entries()) {
      await fs.writeFile(path.join(dir, `f_${String(i).padStart(3, '0')}.png`), await renderFrame(group))
    }
    const output = path.join(dir, 'brat.mp4')
    await runFfmpeg([
      '-y', '-hide_banner', '-loglevel', 'error',
      '-framerate', String(1 / FRAME_SECONDS),
      '-i', path.join(dir, 'f_%03d.png'),
      '-vf', 'fps=15,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23',
      '-movflags', '+faststart', '-an',
      output,
    ])
    const data = await fs.readFile(output)
    if (!data.length) throw new Error('ffmpeg no generó el brat animado')
    return data
  } finally {
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {})
  }
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `*${global.emojis || '✦'} Ingresa un texto para realizar tu sticker animado de Brat.*\n> *Ejemplo:* ${usedPrefix + command} Hello World`, m)
  }

  m.react('⏳')

  try {
    let video = await generateBratVideo(text)
    let bratSticker = await sticker(video, null, global.packname, global.author)

    await conn.sendMessage(m.chat, { sticker: bratSticker }, { quoted: m })
    m.react('✅')
  } catch (err) {
    console.error(err)
    m.react('✖️')
    m.reply(`*✖️ Error:* ${err.message}`)
  }
}

handler.help = ['bratvid']
handler.command = ['bratvid', 'bratv']
handler.tags = ['sticker']

export default handler
