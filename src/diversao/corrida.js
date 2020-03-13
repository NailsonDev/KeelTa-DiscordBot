
const Discord = require("discord.js");
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = (bot, message, args) => {
    if (cooldown.has(message.author.id)) { 

        let cooldownemb = new Discord.RichEmbed()

        .setAuthor(`${message.author.username} espere...`, message.author.displayAvatarURL)
        .setDescription(`Você precisa esperar um pouco para executar novamente!`)
        .setColor(`RED`)
        .setFooter(`Está bem, vou esperar. ⛔`)
        
        return message.channel.send(cooldownemb).then(message => {
         message.react('⛔') 
        })
       }
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 3000);
    
          let user = message.mentions.users.first();

          if (!user) return message.reply('**Você não mencionou o usuario que você quer correr!**').catch(console.error);

          const jogador1 = "<@" + message.author.id + ">"
          const jogador2 =  " <@" + user.id + ">"
          var falas = ["fez **200** metros 🏎 .....","fez **250** metros 🏎 ........","fez **400** metros 🏎 .........."," fez **500** metros 🏎 ............","fez **560** metros 🏎 ............","fez **600** metros 🏎 ..............","fez **670** metros 🏎 ................."," fez **800** metros 🏎 ..................."," fez **1000** metros 🏎 ........................","Explodiu 🔥 ","Bateu e pegou fogo 🔥"]
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

          embed.setTitle('🏎 Poste corrida com seu rival!')
          embed.setDescription(`O ${jogador1} e ${jogador2} estão disputando uma corrida`)
          embed.setColor('ORANGE')
          embed.addField(`O ${message.author.username}: `, ` ${falas[Math.round(Math.random() * falas.length)]}`)
          embed.addField(`O ${user.username}: `, `${falas[Math.round(Math.random() * falas.length )]}`)
          embed.setFooter(bot.user.username, bot.user.displayAvatarURL)
          message.channel.send(embed)
}

exports.help = {
  nome : "Corrida",
  descricao: "Gosta de apostar? Ou até mesmo correr? Esse comando trás você a uma diversão incrível, você pode postar corrida com seu rival, e decedir quem é o melhor."
}