
const Discord = require("discord.js");
const fs = require('fs');
const config = require('../../config.json');
const {configg, diversao, minicraft, moderacao, tankionline, utilitarios} = require('../../legendas')

exports.run = async(bot, message, args) => {

  let embed1 = new Discord.RichEmbed() 
  
  embed1.setTitle(`Categoria: Diversão.`)
  embed1.setColor(`#6800e5`)
  embed1.setFooter(`${bot.user.username}`, `${bot.user.avatarURL}`)
  embed1.addField(`Descrição:`, `\`${diversao}\``)
  embed1.setTimestamp()

  message.channel.send(embed1)

}

exports.help = {
  nome : null,
  descricao: null
}