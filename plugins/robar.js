import { randomBytes } from "crypto"
import { downloadMediaMessage, normalizeMessageContent } from "@whiskeysockets/baileys"
import { canUse } from "../lib/access.js"
import { getContextInfo } from "../lib/identity.js"

const silentLogger = { level: "silent", trace() {}, debug() {}, info() {}, warn() {}, error() {}, child() { return this } }

// Construye el bloque EXIF que WhatsApp usa para el nombre del paquete y el autor
function buildExif(pack, author) {
  const json = Buffer.from(JSON.stringify({
    "sticker-pack-id": randomBytes(16).toString("hex"),
    "sticker-pack-name": pack,
    "sticker-pack-publisher": author,
    emojis: [],
  }), "utf8")
  const header = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00])
  header.writeUInt32LE(json.length, 14)
  return Buffer.concat([header, json])
}

// Mete (o reemplaza) el bloque EXIF dentro de un archivo WebP
function setWebpExif(webp, exif) {
  if (webp.length < 12 || webp.toString("ascii", 0, 4) !== "RIFF" || webp.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error("El sticker no es un WebP válido.")
  }

  let chunks = []
  let pos = 12
  while (pos + 8 <= webp.length) {
    const type = webp.toString("ascii", pos, pos + 4)
    const size = webp.readUInt32LE(pos + 4)
    chunks.push({ type, data: Buffer.from(webp.subarray(pos + 8, pos + 8 + size)) })
    pos += 8 + size + (size % 2)
  }
  chunks = chunks.filter((c) => c.type !== "EXIF")

  let vp8x = chunks.find((c) => c.type === "VP8X")
  if (!vp8x) {
    // WebP simple: hay que crear el bloque VP8X con el tamaño de la imagen
    const image = chunks.find((c) => c.type === "VP8L" || c.type === "VP8 ")
    if (!image) throw new Error("No se encontró la imagen dentro del sticker.")
    let width, height, alpha = 0
    if (image.type === "VP8L") {
      const bits = image.data.readUInt32LE(1)
      width = (bits & 0x3fff) + 1
      height = ((bits >> 14) & 0x3fff) + 1
      alpha = (bits >> 28) & 1
    } else {
      width = image.data.readUInt16LE(6) & 0x3fff
      height = image.data.readUInt16LE(8) & 0x3fff
    }
    const data = Buffer.alloc(10)
    data[0] = alpha ? 0x10 : 0
    data.writeUIntLE(width - 1, 4, 3)
    data.writeUIntLE(height - 1, 7, 3)
    vp8x = { type: "VP8X", data }
    chunks.unshift(vp8x)
  }
  vp8x.data[0] |= 0x08 // marca que el archivo tiene EXIF

  chunks.push({ type: "EXIF", data: exif })

  const parts = []
  for (const { type, data } of chunks) {
    const header = Buffer.alloc(8)
    header.write(type, 0, "ascii")
    header.writeUInt32LE(data.length, 4)
    parts.push(header, data)
    if (data.length % 2) parts.push(Buffer.alloc(1))
  }
  const body = Buffer.concat(parts)
  const riff = Buffer.alloc(12)
  riff.write("RIFF", 0, "ascii")
  riff.writeUInt32LE(body.length + 4, 4)
  riff.write("WEBP", 8, "ascii")
  return Buffer.concat([riff, body])
}

const robar = {
  name: "robar",
  alias: [],
  description: "Roba un sticker con tu nombre. Uso: responde a un sticker con .robar",
  async execute(sock, mctx, args, { config }) {
    if (!(await canUse(sock, mctx, config))) {
      return mctx.reply("「✖」 No tienes acceso al bot. Pídele a un owner que te registre.")
    }

    const ctx = getContextInfo(mctx.raw.message)
    const quoted = normalizeMessageContent(ctx?.quotedMessage)
    if (!quoted?.stickerMessage) {
      return mctx.reply("「✖」 Responde a un sticker con *.robar*.")
    }

    // Aquí puedes cambiar qué nombre se pone (ahora: tu nombre de WhatsApp en ambos)
    const nombre = (mctx.pushName || "").trim() || mctx.senderNumber || "Sin nombre"
    const paquete = nombre
    const autor = nombre

    try {
      const source = {
        key: { remoteJid: mctx.chatJid, id: ctx.stanzaId, participant: ctx.participant },
        message: ctx.quotedMessage,
      }
      const buffer = await downloadMediaMessage(source, "buffer", {}, {
        logger: silentLogger,
        reuploadRequest: sock.updateMediaMessage,
      })
      const sticker = setWebpExif(buffer, buildExif(paquete, autor))
      await sock.sendMessage(mctx.chatJid, { sticker }, { quoted: mctx.raw })
    } catch (error) {
      console.error("Error en .robar:", error)
      await mctx.reply(`「✖」 No se pudo robar el sticker.\n> ${error.message}`)
    }
  },
}

export const commands = [robar]