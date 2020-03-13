const Discord = require("discord.js");
const superagent = require("snekfetch");
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = async(bot, message, args) => {
 
        const embed = new Discord.RichEmbed()   

        if(message.guild === null)return;

        superagent.get('https://nekos.life/api/v2/img/meow')
            .end((err, response) => {

              let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

          let lewdembed = new Discord.RichEmbed()

          let prefix = prefixes[message.guild.id].prefixes;

          let convites = Math.floor((Math.random() * 20) + 0);

          if (convites == 14) {
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 9){
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 4){
           message.reply(`${anuncio.anuncio}`)
         } 

          lewdembed.setImage(response.body.url)
          .setColor(`RANDOM`)
          .setDescription("**Gatos aleatórios** :3" )
          .setFooter(`KeelTa - BOT`)
          .setURL(response.body.url);
          
        message.reply(lewdembed).then(async msg => {
            await msg.react("❤")

            })
            
        })

}

exports.help = {
  nome : "Hug",
  descricao: null
}