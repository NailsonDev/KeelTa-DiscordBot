const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = async (bot, message) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }
    let membros = new Discord.RichEmbed()

    let prefix = prefixes[message.guild.id].prefixes; 

    let valor = message.guild.memberCount
    let name = message.guild.name
    let foto = message.guild.iconURL;

    let online = message.guild.members.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
    let convites = Math.floor((Math.random() * 20) + 0);

    if (convites == 14) {
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 9){
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 4){
     message.reply(`${anuncio.anuncio}`)
   } 

    membros.setTitle(`${name}`)
    membros.setThumbnail(foto)
    membros.setColor('#6800e5')
    membros.addField(`Membros: [${valor}]`, `Online: (${online})\nOcupado: (${ocupado})\nAusente: (${ausente})\nOffline: (${offline})`)
    membros.setFooter(`Clique em ⛔ para fechar.`, `${bot.user.displayAvatarURL}`)
    membros.setTimestamp()
    
    message.reply(membros).then(async msg => {

        msg.react("⛔")

       const a1 = (reaction, user) => reaction.emoji.name ==='⛔' && user.id === message.author.id
       const b1 = msg.createReactionCollector(a1, { time: 300000 });
      
       b1.on("collect", c1 => {
       msg.delete(membros)
       c1.remove(message.author.id)
    })
})
}

exports.help = {
  nome : "Membros",
  descricao: "Você ficou com dúvida sobre a quantidade de membros do seu servidor? Com esse comando isso vai facilitar você!"
}