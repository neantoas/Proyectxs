let handler = async (m, { conn, usedPrefix, command }) => {
  let imageUrl = 'https://files.catbox.moe/ej79en.jpg'
  
  // Extraemos el número de la persona que ejecuta el comando para mencionarla
  let userTag = `@${m.sender.split('@')[0]}`

  let captionText = `Kaisen Bot
𓂃 ࣪˖ ⋆.˚ ʚїɞ ⋆  ${userTag} 4 cm ⋆. 𐙚 ˚
𝚃𝚎𝚗 𝚞𝚗/𝚞𝚗𝚊 excelente tarde ౨ৎ✨

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                MENUS

𖦹°‧★🔖.owner
𖦹°‧★🔖.creator
𖦹°‧★🔖.dueño
𖦹°‧★🔖.menuff
𖦹°‧★🔖.menulogos
𖦹°‧★🔖.menu18
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                INFO

𖦹°‧★📄.ping
𖦹°‧★📄.precios
𖦹°‧★📄.vendedor
𖦹°‧★📄.report
𖦹°‧★📄.suggest
𖦹°‧★📄.totalf
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                AJUSTES

𖦹°‧★⚙️.enable
𖦹°‧★⚙️.disable
𖦹°‧★⚙️.on
𖦹°‧★⚙️.off
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                DESCARGAS

𖦹°‧★🩸.ytmp4
𖦹°‧★🩸.ytmp3
𖦹°‧★🩸.apk
𖦹°‧★🩸.facebook
𖦹°‧★🩸.instagram
𖦹°‧★🩸.tiktok
𖦹°‧★🩸.xnxxdl
𖦹°‧★🩸.xvideosdl
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                SEARCH

𖦹°‧★🔍.pinterest
𖦹°‧★🔍.playstoresearch
𖦹°‧★🔍.spotifysearch
𖦹°‧★🔍.tiktoksearch
𖦹°‧★🔍.xvsearch
𖦹°‧★🔍.yts
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                INTELIGENCIAS

𖦹°‧★🤖.ia
𖦹°‧★🤖.luminai
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                FREE FIRE

𖦹°‧★🎰.gdc
𖦹°‧★🎰.inmixto4
𖦹°‧★🎰.inmixto6
𖦹°‧★🎰.inmasc4
𖦹°‧★🎰.inmasc6
𖦹°‧★🎰.infem4
𖦹°‧★🎰.infem6
𖦹°‧★🎰.donarsala
𖦹°‧★🎰.v4fem
𖦹°‧★🎰.v4masc
𖦹°‧★🎰.v4mixto
𖦹°‧★🎰.v6fem
𖦹°‧★🎰.v6masc
𖦹°‧★🎰.v6mixto
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                FRASES

𖦹°‧★💘.consejo
𖦹°‧★💘.frase
𖦹°‧★💘.piropo
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                CONVERTES

𖦹°‧★🌀.toimg
𖦹°‧★🌀.tomp3
𖦹°‧★🌀.tovideo
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                HERRAMIENTAS

𖦹°‧★🛠️.flag
𖦹°‧★🛠️.removebg
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                GRUPOS

𖦹°‧★🪼.admins
𖦹°‧★🪼.grouptime
𖦹°‧★🪼.delete
𖦹°‧★🪼.demote
𖦹°‧★🪼.encuesta
𖦹°‧★🪼.fantasmas
𖦹°‧★🪼.kickfantasmas
𖦹°‧★🪼.groupdesc
𖦹°‧★🪼.notify
𖦹°‧★🪼.Aviso
𖦹°‧★🪼.inactivos list
𖦹°‧★🪼.inactivos kick
𖦹°‧★🪼.kick
𖦹°‧★🪼.link
𖦹°‧★🪼.promote
𖦹°‧★🪼.ruletaban
𖦹°‧★🪼.setkick
𖦹°‧★🪼.gupo abrir
𖦹°‧★🪼.grupo cerrar
𖦹°‧★🪼.todos
𖦹°‧★🪼.delwarn
𖦹°‧★🪼.warn
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                EFECTOS

𖦹°‧★🕯️.bass
𖦹°‧★🕯️.blown
𖦹°‧★🕯️.deep
𖦹°‧★🕯️.earrape
𖦹°‧★🕯️.fast
𖦹°‧★🕯️.fat
𖦹°‧★🕯️.nightcore
𖦹°‧★🕯️.reverse
𖦹°‧★🕯️.robot
𖦹°‧★🕯️.slow
𖦹°‧★🕯️.smooth
𖦹°‧★🕯️.tupai
𖦹°‧★🕯️.reverb
𖦹°‧★🕯️.chorus
𖦹°‧★🕯️.flanger
𖦹°‧★🕯️.distortion
𖦹°‧★🕯️.pitch
𖦹°‧★🕯️.highpass
𖦹°‧★🕯️.lowpass
𖦹°‧★🕯️.underwater
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                DIVERSIÓN

𖦹°‧★🫟.gay
𖦹°‧★🫟.lesbiana
𖦹°‧★🫟.pajero
𖦹°‧★🫟.pajera
𖦹°‧★🫟.puto
𖦹°‧★🫟.puta
𖦹°‧★🫟.manco
𖦹°‧★🫟.manca
𖦹°‧★🫟.rata
𖦹°‧★🫟.prostituto
𖦹°‧★🫟.prostituta
𖦹°‧★🫟.sinpoto
𖦹°‧★🫟.sintetas
𖦹°‧★🫟.chipi
𖦹°‧★🫟.chiste
𖦹°‧★🫟.doxear
𖦹°‧★🫟.facto
𖦹°‧★🫟.formartrio
𖦹°‧★🫟.genio
𖦹°‧★🫟.love
𖦹°‧★🫟.formarpareja
𖦹°‧★🫟.formarparejas
𖦹°‧★🫟.personalidad
𖦹°‧★🫟.pregunta
𖦹°‧★🫟.sorteo
𖦹°‧★🫟.top
𖦹°‧★🫟.verdad
𖦹°‧★🫟.penetrar
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                JUEGOS

𖦹°‧★🎮.acertijo
𖦹°‧★🎮.delttt
𖦹°‧★🎮.trivia
𖦹°‧★🎮.ttt
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                RANDOM

𖦹°‧★🩰.cr7
𖦹°‧★🩰.messi
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                MAKER

𖦹°‧★🎠.cfrase
𖦹°‧★🎠.pfp
𖦹°‧★🎠.brat <texto>
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                LOGOS

𖦹°‧★🕸️.logocorazon
𖦹°‧★🕸️.logochristmas
𖦹°‧★🕸️.logopareja
𖦹°‧★🕸️.logoglitch
𖦹°‧★🕸️.logosad
𖦹°‧★🕸️.logogaming
𖦹°‧★🕸️.logosolitario
𖦹°‧★🕸️.logodragonball
𖦹°‧★🕸️.logoneon
𖦹°‧★🕸️.logogatito
𖦹°‧★🕸️.logochicagamer
𖦹°‧★🕸️.logonaruto
𖦹°‧★🕸️.logofuturista
𖦹°‧★🕸️.logonube
𖦹°‧★🕸️.logoangel
𖦹°‧★🕸️.logomurcielago
𖦹°‧★🕸️.logocielo
𖦹°‧★🕸️.logograffiti3d
𖦹°‧★🕸️.logomatrix
𖦹°‧★🕸️.logohorror
𖦹°‧★🕸️.logoalas
𖦹°‧★🕸️.logoarmy
𖦹°‧★🕸️.logopubg
𖦹°‧★🕸️.logopubgfem
𖦹°‧★🕸️.logolol
𖦹°‧★🕸️.logoamongus
𖦹°‧★🕸️.logovideopubg
𖦹°‧★🕸️.logovideotiger
𖦹°‧★🕸️.logovideointro
𖦹°‧★🕸️.logovideogaming
𖦹°‧★🕸️.logoguerrero
𖦹°‧★🕸️.logoportadaplayer
𖦹°‧★🕸️.logoportadaff
𖦹°‧★🕸️.logoportadapubg
𖦹°‧★🕸️.logoportadacounter
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                GIFS-NSFW

𖦹°‧★🧸.anal
𖦹°‧★🧸.cum
𖦹°‧★🧸.fap
𖦹°‧★🧸.follar
𖦹°‧★🧸.footjob
𖦹°‧★🧸.fuck
𖦹°‧★🧸.fuck2
𖦹°‧★🧸.grabboobs
𖦹°‧★🧸.lickpussy
𖦹°‧★🧸.mamada
𖦹°‧★🧸.manosear
𖦹°‧★🧸.boobjob
𖦹°‧★🧸.sex
𖦹°‧★🧸.sixnine
𖦹°‧★🧸.suckboobs
𖦹°‧★🧸.violar
𖦹°‧★🧸.lesbianas
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                NSFW

𖦹°‧★🔞.pack
𖦹°‧★🔞.videoxxx
𖦹°‧★🔞.videoxxx2
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                STICKER

𖦹°‧★🏵️.brat <texto>
𖦹°‧★🏵️.dado
𖦹°‧★🏵️.quotly <texto>
𖦹°‧★🏵️.sticker
𖦹°‧★🏵️.wm
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                RPG

𖦹°‧★💰.bank
𖦹°‧★💰.coins
𖦹°‧★💰.cartera
𖦹°‧★💰.cofre
𖦹°‧★💰.depositar
𖦹°‧★💰.levelup
𖦹°‧★💰.minar
𖦹°‧★💰.retirar
𖦹°‧★💰.ruleta
𖦹°‧★💰.prostituirse
𖦹°‧★💰.work
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                REGISTRO

𖦹°‧★🌸.profile
𖦹°‧★🌸.unreg
𖦹°‧★🌸.reg
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

    𓂃ෆ˚────୨ৎ────𐚁๋࣭⭑ֶָ֢
                OWNER

𖦹°‧★💐.salirgc <link>
𖦹°‧★💐.addowner
𖦹°‧★💐.delowner
𖦹°‧★💐.autoadmin
𖦹°‧★💐.=× 
𖦹°‧★💐.banchat
𖦹°‧★💐.banuser
𖦹°‧★💐.blocklist
𖦹°‧★💐.cheat
𖦹°‧★💐.join
𖦹°‧★💐.restart
𖦹°‧★💐.rev
𖦹°‧★💐.revsall
𖦹°‧★💐.setnamebot <nuevo nombre>
𖦹°‧★💐.setppbot
𖦹°‧★💐.unbanchat
𖦹°‧★💐.unbanuser
𖦹°‧★💐.update
˚₊‧✩ ˚₊‧꒰ა ʚིᵋº̣̥͙̣̥͙ᵌɞྀ ໒꒱ ‧₊˚ ✩‧₊˚

> KaisenBot'`

  await conn.sendMessage(m.chat, { 
    image: { url: imageUrl }, 
    caption: captionText,
    mentions: [m.sender] 
  }, { quoted: m })
}

handler.help = ['menu']
handler.command = ['menu', 'menú', 'help']
handler.tags = ['main']

export default handler