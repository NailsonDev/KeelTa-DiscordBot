const Discord = require('discord.js')
const fs = require('fs')
const config = require('../../config.json')

exports.run = async(bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
          prefixes: config.prefix
        };
      }
  
    let prefix = prefixes[message.guild.id].prefixes
    let version = new Discord.RichEmbed()

    .setTitle('Versão atual 1.8.0/ Log\'s.')
    .setDescription(`\`[06/03/2020]\` Adicionado o comando **${prefix}8ball**, ainda pode conter erros...\n\`[06/03/2020]\` Sistema de level foi resetado devido a um erro.\n\`[06/03/2020]\` Corrigido Bug's do terminal.\n\`[05/03/2020]\` Adicionado **11** comandos para NSFW.\n\`[18/02/2020]\` Corrigido alguns emojis não funcionavam.\n\`[18/02/2020]\` Adicionado novos comandos:\n**${prefix}mcserver** e **${prefix}mcicon** usem **${prefix}help <comando>** para mais informações.\n\n\`[18/02/2020]\` Corrigido alguns Bug's no terminal.\n\`[18/02/2020]\` Corrigido o erro do **${prefix}Skin**\n\n\`[07/02/2020]\` Adicionado **toLowerCase**.`)
    .setColor('GREEN')
    .setFooter(bot.user.username)
    .setThumbnail(bot.user.avatarURL)

     message.channel.send(version)

}

exports.help = {
    nome: 'Versão',
    descricao: 'Ver novas atualizações do BOT, sempre que aver atualizações em nosso BOT, iremos notificar nessa área.'
}