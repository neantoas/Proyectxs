// Expresión regular mejorada para capturar el link de WhatsApp con mayor precisión
let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

// Únicos números que pueden usar este comando (sin el signo +, sin espacios ni paréntesis)
const allowedNumbers = [
    '51912237503',
    '51982134334',
    '15146727723'
]

let handler = async (m, { conn, text, participants }) => {
    // 1. Obtener el número real del remitente (aunque WhatsApp lo muestre como @lid)
    let miembro = (participants || []).find(p => p.jid === m.sender || p.lid === m.sender)
    let jidReal = miembro?.jid || m.sender || ''
    let senderNumber = jidReal.endsWith('@s.whatsapp.net') ? jidReal.split('@')[0] : null

    // 2. Verificar si el remitente está en la lista permitida
    if (!senderNumber || !allowedNumbers.includes(senderNumber)) {
        return m.reply('*❌ No tienes permisos para usar este comando.*')
    }

    if (!text) {
        return m.reply('*⚠️ Ingresa el enlace del grupo.*\n> Permanente: .entrar https://chat.whatsapp.com/xxx\n> Temporal: .entrar https://chat.whatsapp.com/xxx 30')
    }

    // Separamos el texto por espacios: primero el link, después los días (opcional)
    let args = text.trim().split(/\s+/)
    let linkInput = args[0]
    let diasInput = args[1]

    let match = linkInput.match(linkRegex)
    if (!match) return m.reply('*⚠️ Enlace de WhatsApp inválido.*')

    // 3. Validar los días ANTES de entrar al grupo
    let dias = null
    if (diasInput !== undefined) {
        if (!/^\d+$/.test(diasInput) || parseInt(diasInput) < 1) {
            return m.reply('*⚠️ Los días deben ser un número mayor a 0.*\n> Ejemplo: .entrar https://chat.whatsapp.com/xxx 30')
        }
        dias = Math.min(999, parseInt(diasInput))
    }

    try {
        let code = match[1]

        // 4. Unirse al grupo usando el código del enlace
        let res = await conn.groupAcceptInvite(code)

        // Asegurar que exista la base de datos para ese grupo nuevo
        let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {})

        if (dias === null) {
            // SIN DÍAS: permanencia permanente (se borra cualquier expiración anterior)
            chats.expired = 0
            chats.botDias = 0
            chats.botInicio = Date.now()
            chats.botExpira = 0

            return m.reply('*✅ Bot unido permanentemente al grupo.*')
        }

        // CON DÍAS: permanencia temporal con temporizador
        let inicio = Date.now()
        let expiracion = inicio + dias * 24 * 60 * 60 * 1000

        chats.expired = expiracion // este es el campo que usa _expired.js para sacar al bot
        chats.botDias = dias
        chats.botInicio = inicio
        chats.botExpira = expiracion

        let fechaExpira = global.moment(expiracion).tz('America/Lima').format('DD/MM/YYYY hh:mm A')

        return m.reply(
            `*✅ El bot se unió correctamente al grupo.*\n\n` +
            `*⌛ Permanencia:* \`${dias}\` días\n` +
            `*🔴 Se saldrá el:* ${fechaExpira}`
        )
    } catch (error) {
        console.error(error)
        return m.reply('*✖️ Ocurrió un error al intentar entrar al grupo (es posible que el enlace haya expirado o el bot ya esté dentro).*')
    }
}

handler.help = ['entrar <link> <dias>']
handler.tags = ['owner']
handler.command = ['entrar', 'join']

export default handler