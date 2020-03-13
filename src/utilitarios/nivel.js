const Discord = require("discord.js");

let xp = require("../../xp.json");

exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let keeltaXp = xp[message.author.id].xp; //xp
  let keeltaLvl = xp[message.author.id].level; // level
  let KeeltaNext = keeltaLvl * 600;     // proximo level xp atual
  let KeeltaDiference = keeltaLvl - keeltaXp;  // próximo level.

  let embed = new Discord.RichEmbed()

  .setColor('#6800e5')
  .setDescription(`**[${keeltaLvl}] ${message.author.username} **:\n----------\nNível: **${keeltaLvl}**\nExperiência: **${keeltaXp} / ${KeeltaNext}**\nPróximo nível: **${keeltaLvl + 1}**`)
  .setFooter(message.author.username, message.author.avatarURL)
  .setTimestamp(true)

  message.channel.send(embed)

}

exports.help = {
  nome: "Nível:",
  descricao: null
}