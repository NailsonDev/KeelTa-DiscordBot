const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {

 let akinator = new Discord.RichEmbed()

 akinator.setTitle('<:akinator:665002874258063370> Akinator')
 akinator.setDescription('**Progresso**: \`0%\`\n\n**O seu personagem é um menino?**\n\n👍 **Sim**.\n👎 **Não**.\n😭 **Não sei**\n🤨 **Provavelmente sim**.\n🙂 **Provavelmente não**.')
 akinator.setColor('GREEN')
 akinator.setThumbnail('https://cdn.discordapp.com/attachments/642835328889258032/665005170719195186/dd.png')
 akinator.setFooter('Devido à um erro no sistema, esse comando está bloqueado.')

 message.channel.send(akinator)
 .then(async message => {
    await message.react('👍')
    await message.react('👎')
    await message.react('😭')
    await message.react('🤨')
    await message.react('🙂')
 })

}


exports.help = {
    nome : "Akinator",
    descricao: []
  }