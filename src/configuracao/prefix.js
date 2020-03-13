
const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json')

exports.run = async(bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      }; //{"561233195199102994":{"prefixes":"?"}}
    }
        let embed = new Discord.RichEmbed()
        
        let prefix = prefixes[message.guild.id].prefixes; 

        embed.setAuthor(` ${message.author.username}`, `${message.author.avatarURL}`)
        embed.setColor("RANDOM")
        embed.setTitle(`Prefixo do servidor.`)
        embed.setDescription(`Prefixo atual é: **${prefix}**`)
        embed.setThumbnail('https://cdn.discordapp.com/attachments/643563703924424726/647986240842366976/emoji.png')
        embed.setFooter(`Donos podem mudar o prefixo, usando ${prefix}setprefix`)
        embed.setTimestamp()
        message.reply(embed);
  
}

exports.help = {
  nome : "Prefix",
  descricao: "Com esse comando você saberá qual é o prefixo que o bot tem no servidor."
}