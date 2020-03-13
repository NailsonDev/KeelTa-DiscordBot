const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot, message, args) => {
    
    let gAvatar = message.guild.iconURL;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

    let embed = new Discord.RichEmbed()

    let convites = Math.floor((Math.random() * 20) + 0);

    if (convites == 14) {
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 9){
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 4){
     message.reply(`${anuncio.anuncio}`)
   } 
   
    let prefix = prefixes[message.guild.id].prefixes;  
    
    let bots = message.guild.members.filter((mem) => mem.user.bot === true).size;
    let online = message.guild.members.filter(a => a.presence.status == "online").size;
    let ocupado = message.guild.members.filter(a => a.presence.status == "dnd").size;
    let ausente = message.guild.members.filter(a => a.presence.status == "idle").size;
    let offline = message.guild.members.filter(a => a.presence.status == "offline").size;
    

    embed.setTimestamp()
    embed.setTitle(`${message.guild.name}`)
    embed.setThumbnail(gAvatar)
    embed.setColor("RANDOM")
    embed.setDescription(`Algumas informações do nosso Discord **${message.guild.name}**!`)
    embed.addField(`✅ ID do servidor`, `\`${message.guild.id}\``)
    embed.addField(`⚠️ Fundador do Servidor`, message.guild.owner, true)
    embed.addField(`🏳️ Região do Servidor`, message.guild.region, true)
    embed.addField(`🔊 Total de Canais`, message.guild.channels.size)
    embed.addField(`📅 Este Discord foi criado em`, moment(message.guild.createdAt).format('LL'))
    embed.addField(`📥 Você entrou aqui no dia`, moment(message.member.joinedAt).format('LL'))
    embed.addField(`👩‍🦰 Membros (${message.guild.memberCount})\n🤖 Bots: [${bots}]\n`, ` Online: \`${online}\`\nOcupado: \`${ocupado}\`\nAusente: \`${ausente}\`\nOffiline: \`${offline}\``)
    //embed.addField(`Cargos (${message.guild.roles.size - 1})`, message.guild.roles.map(a => a).join(", "))
    embed.setFooter(bot.user.username, message.client.user.avatarURL)
    message.react('🆗');
    message.channel.send(embed)

    }

exports.help = {
  nome : "Serverinfo",
  descricao: "Quer saber as informações do servidor que está? Basta usar esse comando e irá obter todas informações possíveis."
}