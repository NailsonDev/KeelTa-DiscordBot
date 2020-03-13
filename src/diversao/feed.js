
const Discord = require("discord.js");
const superagent = require("snekfetch");
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = async(bot, message, args) => {
  
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
        const embed = new Discord.RichEmbed()   

        if(message.guild === null)return;

        superagent.get('https://nekos.life/api/v2/img/feed')
            .end((err, response) => {
              let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }
          const lewdembed = new Discord.RichEmbed()

          let convites = Math.floor((Math.random() * 20) + 0);

          if (convites == 14) {
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 9){
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 4){
           message.reply(`${anuncio.anuncio}`)
         } 

 lewdembed.setImage(response.body.url)
          .setColor(`#6800e5`)
          .setDescription("**Alguns GIFs de anime comendo.** :3" )
          .setFooter(bot.user.username)
          .setURL(response.body.url);
          
        message.reply(lewdembed).then(async msg => {
            await msg.react("❤")

            })
            
        })

}

exports.help = {
  nome : "Feed",
  descricao: null
}