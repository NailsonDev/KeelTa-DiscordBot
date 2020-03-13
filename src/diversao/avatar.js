const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');

exports.run = async(bot, message, args) => {

 
        let usuario = message.mentions.members.first() || message.member;

        let avatar = usuario.user.displayAvatarURL || usuario.user.id

        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

        if(usuario.user.id == message.author) {
          
          let embed = new Discord.RichEmbed()

          embed.setAuthor(` ${message.author.username}`, `${message.author.avatarURL}`)
          embed.setColor("#6800e5")
          embed.setTitle(`📥 | Clique aqui para baixar`)
          embed.setDescription(`:frame_photo: | Avatar do jogador **${usuario}**`)
          embed.setURL(avatar)
          embed.setImage(avatar)
          embed.setFooter(bot.user.username, bot.user.avatarURL)
          embed.setTimestamp()
          message.reply(embed);

        } else {

          let embed = new Discord.RichEmbed()

            embed.setAuthor(` ${message.author.username}`, `${message.author.avatarURL}`)
            embed.setColor("#6800e5")
            embed.setTitle(`📥 | Clique aqui para baixar`)
            embed.setDescription(`:frame_photo: | Avatar do jogador **${usuario}**`)
            embed.setURL(avatar)
            embed.setImage(avatar)
            embed.setFooter(bot.user.username, bot.user.avatarURL)
            embed.setTimestamp()
          message.reply(embed);

        }
       
  
}

exports.help = {
  nome : "Avatar",
  descricao: "Esse comando serve para obter um avatar de outro usuário, ou você pode até mesmo obter o seu."
}

exports.menu = {
  nome : "Avatar",
  descricao: "Ver o avatar de alguém."
}