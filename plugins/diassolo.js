const handler = async (m, { conn, args }) => {

  // 1. Definir los únicos números autorizados (solo dígitos)
  const allowedNumbers = ['51992621601', '56927280073'];

  // 2. Extraer y limpiar el número del remitente del mensaje
  let senderNumber = (m.sender || '').replace(/\D/g, '');

  // 3. Verificar estrictamente si el remitente está en la lista permitida
  if (!allowedNumbers.includes(senderNumber)) {
    return m.reply('*❌ No tienes permisos para usar este comando.*');
  }

  if (!m.isGroup) {
    return m.reply('🌷 Este comando solo puede utilizarse dentro de un grupo.')
  }

  if (!args[0]) {
    return m.reply(
      '🌷 *USO DEL COMANDO*\n\n' +
      'Ejemplo:\n' +
      '.dias 30\n\n' +
      'Puedes colocar la cantidad de días que quieras.'
    )
  }

  const dias = parseInt(args[0])

  if (isNaN(dias) || dias <= 0) {
    return m.reply(
      '❌ Debes colocar una cantidad de días válida.\n\n' +
      'Ejemplo:\n' +
      '.dias 30'
    )
  }

  // Crear o actualizar los datos del grupo en la base de datos
  if (!global.db.data.chats[m.chat]) {
    global.db.data.chats[m.chat] = {}
  }

  const chat = global.db.data.chats[m.chat]

  // Fecha de inicio y cálculo de expiración
  const inicio = Date.now()
  const duracion = dias * 24 * 60 * 60 * 1000
  const expiracion = inicio + duracion

  // Guardar datos
  chat.botDias = dias
  chat.botInicio = inicio
  chat.botExpira = expiracion

  const fechaInicio = new Date(inicio).toLocaleString()
  const fechaExpira = new Date(expiracion).toLocaleString()

  await conn.sendMessage(m.chat, {
    text:
      '🌷 *DIAS AGREGADOS*\n\n' +
      '╭───────────────\n' +
      '│ 📅 Días: *' + dias + '*\n' +
      '│ 🟢 Inicio: *' + fechaInicio + '*\n' +
      '│ 🔴 Expira: *' + fechaExpira + '*\n' +
      '╰───────────────\n\n' +
      '✅ Los días fueron agregados correctamente.\n' +
      '🌷 Al finalizar el período, el bot abandonará automáticamente el grupo.'
  })

}

handler.help = ['dias <cantidad>']
handler.tags = ['owner']
handler.command = /^dias$/i
handler.group = true

export default handler