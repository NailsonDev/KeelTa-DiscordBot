const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = (bot, message, args) => {

    let skin = args.slice(0).join(' ');
    if (skin.length < 1) return message.reply('use um nickname de um jogador com conta premium.');
      
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

    let skin1 = new Discord.RichEmbed()
    
    let prefix = prefixes[message.guild.id].prefixes; 

    let convites = Math.floor((Math.random() * 20) + 0);

              if (convites == 14) {
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 9){
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 4){
               message.reply(`${anuncio.anuncio}`)
             } 

    skin1.setTitle(`[<a:minecraftat:637058475637342219>] Nick: **${args[0]}**`)
    .setColor("#0051FF")
    .setImage(`https://mc-heads.net/body/${args[0]}`)
    .setDescription(`**[Clique aqui](https://mc-heads.net/download/${args[0]})** para baixar: 📥`)
    .setFooter(`${bot.user.username}`, `${message.author.avatarURL}`)
    .setTimestamp()
    message.channel.send(skin1)
};

exports.help = {
  nome : "Skin",
  descricao: "Quer saber uma skin legal? Ou saber uma skin de um amigo seu? Esse comando é o certo! Use ele para ver outras skin de outros jogadores."
}