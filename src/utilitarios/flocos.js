const Discord = require("discord.js");
let xp = require("../../xp.json");

module.exports.run = async (bot, message, args) => {
  //!coins
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      coins: 0
    };
  }

  let flocos = xp[message.author.id].coins;
  let embed = new Discord.RichEmbed()

  .setColor("#6800e5")
  .setDescription(`Total de Flocos: **${flocos}** <:flocos:682330069779480632>`)

  message.channel.send(embed)
}
