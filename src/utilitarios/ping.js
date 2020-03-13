const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot,message,args) => {
  
  message.channel.send('> **Verificando a latência**. <a:299_Loading:654448902900154368>')
  .then(message => {
    message.delete(2000)
  })

 setTimeout(() => {

  let keelta = new Date() - message.createdAt;
  let embed = new Discord.RichEmbed()
  let convites = Math.floor((Math.random() * 20) + 0);

  if (convites == 14) {
   message.reply(`${anuncio.anuncio}`)
 } else if (convites == 9){
   message.reply(`${anuncio.anuncio}`)
 } else if (convites == 4){
   message.reply(`${anuncio.anuncio}`)
 } 
  embed.setTitle("Respostas da mensagem ao servidor.")

  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#6800e5")
  .addField(` ${bot.user.username}: `, Math.floor(keelta) + " ms", true)
  .addField(" API: ", Math.floor(bot.ping) + " ms", true)
  .setTimestamp()
  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
  
  message.channel.send(embed)

  }, 2020)
   
}

exports.help = {
  nome : "Ping",
  descricao: "Com esse comando você poderá ver a lantência do bot, e a resposta entre a sua mensagem ea do bot."
}