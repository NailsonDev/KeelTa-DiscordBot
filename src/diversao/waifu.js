
const Discord = require("discord.js");
const superagent = require("snekfetch");
const fs = require('fs');
const config = require('../../config.json');
const cooldown = new Set();
const anuncio = require('../../anuncio.json')

exports.run = async (bot, message, args, level) => {

            if (cooldown.has(message.author.id)) {

                let cooldownemb = new Discord.RichEmbed()

                .setAuthor(`${message.author.username} espere...`, `${message.author.displayAvatarURL}`)
                .setDescription(`Você precisa esperar 2,4 segundos!`)
                .setColor(`#6800e5`)
                .setFooter(`Mensagem vai ser deletada em 5sg...`)

                return message.channel.send(cooldownemb).then(message => {
                 message.delete(2400) 
                })
               }
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, 4000);

            superagent.get('https://nekos.life/api/v2/img/waifu')
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

     lewdembed.setTitle("| Clique aqui para baixar!")
              .setDescription(" Aqui está sua **WAIFU** " + message.author.toString())
              .setImage(response.body.url)
              .setFooter(bot.user.username, message.author.avatarURL)
              .setTimestamp()
              .setColor(`#6800e5`)
              .setURL(response.body.url);

          message.channel.send(lewdembed);
            })
          
        }

        exports.help = {
          nome : "Waifu",
          descricao: "Você está procurando uma Waifu? Bom eu posso recomendar umas para você!"
        }