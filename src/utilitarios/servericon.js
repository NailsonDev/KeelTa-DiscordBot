const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot, message, args) => {
    
    let gAvatar = message.guild.iconURL;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

    let embed = new Discord.RichEmbed()

    let prefix = prefixes[message.guild.id].prefixes; 

    let convites = Math.floor((Math.random() * 20) + 0);

              if (convites == 14) {
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 9){
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 4){
               message.reply(`${anuncio.anuncio}`)
             } 

    embed.setDescription(`Clique **[aqui](${gAvatar})** para baixar`)
    embed.setImage(gAvatar) 
    embed.setColor("#6800e5")
    embed.setFooter(`${message.author.tag}`, message.client.user.avatarURL)

    message.react('🆗');
    message.channel.send(embed);
}

exports.help = {
  nome : "servericon",
  descricao: "Caso você queira baixar um icon de um servidor, você pode usar esse comando, facilitará para você."
}