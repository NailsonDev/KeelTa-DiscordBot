const Discord = require('discord.js');
const moment = require('moment'); 
moment.locale('pt-BR');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot, message, args) => {

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

    let gAvatar = message.guild.iconURL

    let topicSemNada = 'Não definido.';
    let topic = message.channel.topic || topicSemNada;

    let nsfwnao = 'Não ';
    let nsfwsim = 'Sim ';
    
    let tipo1 = 'Texto';
    let tipo2 = 'Voz';

    let tipos = message.channel.type ? tipo1 : tipo2

    let nsfw = message.channel.nsfw ? nsfwsim : nsfwnao;
    let filter = moment(message.channel.createdAt).format('LLL')

    embed.setTitle(` Informações do canal: #` + message.channel.name)
    embed.setDescription(`**ID do Discord**\n• \`${message.channel.id}\`\n**Menção do canal**\n• ${message.channel}\n**Tópico do canal**\n• ${topic}\n **Guild**\n• ${message.guild.name}\n🔞 **NSFW**\n• ${nsfw}\n **Canal criado há**\n• \`${filter}\`\n **Posição do canal**:\n• \`${message.channel.position}\`\n **Canal do tipo**:\n• \`${tipos}\` `)
    
    embed.setFooter(`${bot.user.username}`)
    embed.setThumbnail(gAvatar)
    embed.setColor("#6800e5")

    message.channel.send(embed);
}
 
exports.help = {
  nome : "Infochannel",
  descricao: "Você pode obter informações sobre um canal específico ultilizando esse comando."
}