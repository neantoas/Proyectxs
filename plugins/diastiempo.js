//Mejorado por Aleizn

// Expresión regular mejorada para capturar el link de WhatsApp con mayor precisión
let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

let handler = async (m, { conn, text }) => {
    // 1. Definir los únicos números autorizados (solo dígitos)
    const allowedNumbers = ['51992621601', '56927280073'];

    // 2. Extraer y limpiar el número del remitente del mensaje
    let senderNumber = (m.sender || '').replace(/\D/g, '');

    // 3. Verificar si el remitente está en la lista permitida
    if (!allowedNumbers.includes(senderNumber)) {
        return m.reply('*❌ No tienes permisos para usar este comando.*');
    }

    if (!text) return m.reply('*⚠️ Ingresa el enlace del grupo y la cantidad de días.\nEjemplo: .entrar https://chat.whatsapp.com/xxx 30*');

    try {
        // Separamos el texto por espacios para identificar el link y los días de forma independiente
        let args = text.trim().split(/\s+/);
        let linkInput = args[0];
        let diasInput = args[1]; // El segundo argumento serán los días

        let match = linkInput.match(linkRegex);
        if (!match) return m.reply('*⚠️ Enlace de WhatsApp inválido.*');

        let code = match[1];

        // 4. Unirse al grupo usando el código del enlace
        let res = await conn.groupAcceptInvite(code);
        m.reply(`*✅ El bot se unió correctamente al grupo.*`);

        // 5. Configurar los días de permanencia si se especificaron
        if (diasInput) {
            let dias = Math.min(999, Math.max(1, isNumber(diasInput) ? parseInt(diasInput) : 0));
            
            if (dias > 0) {
                // Asegurar que exista la base de datos para ese chat/grupo nuevo
                let chats = global.db.data.chats[res] || (global.db.data.chats[res] = {});
                
                let inicio = Date.now();
                let duracion = dias * 24 * 60 * 60 * 1000;
                let expiracion = inicio + duracion;

                chats.botDias = dias;
                chats.botInicio = inicio;
                chats.botExpira = expiracion;

                let fechaExpira = new Date(expiracion).toLocaleString();
                m.reply(`*⌛ Permanecerá en el grupo durante \`${dias}\` días.*\n*🔴 Expira el: ${fechaExpira}*`);
            } else {
                m.reply(`*⚠️ El número de días ingresado no es válido. Puedes configurarlos después con .dias [cantidad]*`);
            }
        } else {
            m.reply(`*⚠️ No especificaste los días. El bot se unió, pero no se programó auto-salida. Puedes usar .dias en el grupo si lo deseas.*`);
        }

    } catch (error) {
        console.error(error);
        return m.reply(`*✖️ Ocurrió un error al intentar entrar al grupo (es posible que el enlace haya expirado o el bot ya esté dentro).*`); 
    }
}

handler.help = ['entrar <link> <dias>']
handler.tags = ['owner']
handler.command = ['entrar', 'join']

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))