const Discord = require("discord.js");
const cooldown = new Set()
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = async (bot, message) => {
    
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

    
    var user = message.mentions.users.first();

    if (!user) user = message.author;

    var targetInvites = await message.guild.fetchInvites();

    var invitesUses = 0;

    targetInvites.forEach(invite => {
        if (invite.inviter.id === user.id) {
            invitesUses += invite.uses;
          }
    });

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }

    var embed = new Discord.RichEmbed()

    let prefix = prefixes[message.guild.id].prefixes;
    
    let convites = Math.floor((Math.random() * 20) + 0);

    if (convites == 14) {
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 9){
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 4){
     message.reply(`${anuncio.anuncio}`)
   } 

    embed.setThumbnail(user.displayAvatarURL)
    .setTitle(`Nick : ${user.tag}`)
    .addField("Total de invites:", `\`\`\`md\n${invitesUses}\`\`\``)
    .setColor('#6800e5')
    .setFooter(`ID : ${user.id}`)
    .setTimestamp();

    message.channel.send(embed)
};
exports.help = {
  nome : "Check",
  descricao: "Seu servidor é de Loja, ou Invite = Produto, use esse comando para ver todos invites de um jogador."
}