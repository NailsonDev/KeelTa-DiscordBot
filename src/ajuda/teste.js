const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

module.exports.run = async(bot, message, args) => {

setTimeout(() => {
  message.react('✅')
}, 12000)

  message.reply("Enviei o comando em seu privado!")
  .then(message => {

    setTimeout(() => {
      message.edit(`<@${message.author.id}>, lembre-se esse comando serve apenas para futuros comandos para o BOT. Ainda podem conter erros, então não se preocupe em relação ao reportar o mesmo.`)
      message.delete(10000)
    }, 3020)
    
  })

  let comandos1 = new Discord.RichEmbed()

      .setTitle(`Categorias da ${bot.user.username}.`)
      .setDescription(`Olá, sou **${bot.user.username}** estou feliz para poder participar do seu servidor! Me adicione [aqui](https://is.gd/KeeltaBot) ficarei muito grata! ❤️\n\n**Categoria**:\nAjuda:  ❓\nConfigução:  ⚙️\nDiversão:  💖\nMinecraft:  🎮\nModeração:  🖥️\nNSFW:  😍\nTanki Online:  ⚠️\nUtilitários:  ⁉️`)
      
      .setFooter(bot.user.username,bot.user.avatarURL)
      .setColor('#6800e5')
      .setTimestamp()

    message.member.send(comandos1)
    .then(async message => {

      await message.react('❓')
      await message.react('⚙️')
      await message.react('💖')
      await message.react('🎮')
      await message.react('🖥️')
      await message.react('😍')
      await message.react('⚠️')
      await message.react('⁉️')
      
    })

}
exports.help = {
    nome : "Teste",
    descricao: null
  } 
