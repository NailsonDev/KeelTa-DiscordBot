const superagent = require("snekfetch");
const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = async (bot, message, args, level) => {

    if (!message.guild)
    return message.channel.send('Você não tem permissão!')
    superagent.get('https://nekos.life/api/v2/img/kemonomimi')
        .end((err, response) => {

          let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
          if(!prefixes[message.guild.id]){
            prefixes[message.guild.id] = {
             prefixes: config.prefix
            };
          }

      const lewdembed = new Discord.RichEmbed()

      let prefix = prefixes[message.guild.id].prefixes;
      
      let convites = Math.floor((Math.random() * 20) + 0);

      if (convites == 14) {
       message.reply(`${anuncio.anuncio}`)
     } else if (convites == 9){
       message.reply(`${anuncio.anuncio}`)
     } else if (convites == 4){
       message.reply(`${anuncio.anuncio}`)
     } 

      let avatar = message.client.user.displayAvatarURL

      lewdembed.setTitle("Clique aqui para baixar!")
      lewdembed.setDescription("Aqui está " + message.author.toString() + ": ")
      lewdembed.setImage(response.body.url)
      lewdembed.setFooter(bot.user.username, avatar)
      lewdembed.setTimestamp()
      lewdembed.setColor(`#6800e5`)
      lewdembed.setURL(response.body.url);
  message.channel.send(lewdembed);
    })
	
}
exports.help = {
  nome : "Foto",
  descricao: "Esse comando apenas vem algumas fotos aleatórias de anime, muito legal para procurar algumas fotos de perfil."
}