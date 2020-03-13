const Discord = require("discord.js");
const math = require('mathjs');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (client, message, args) => {
    let input = args.join(" ");
    if (!input) {
        message.reply('Você deve fornecer uma equação para ser resolvida na calculadora!');
        return;
    }

    const question = args.join(" ");

    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        return message.reply(`Questão invalida ⛔`);
    }

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

    embed.setTitle('Calculadora')
        .setThumbnail("https://cdn.icon-icons.com/icons2/923/PNG/512/calculator_icon-icons.com_72046.png")
        .setColor("#6800e5")
        .addField("**Pergunta:**", question, true)
        .addField("**Resposta:**", answer);
        message.channel.send(embed)
}

exports.help = {
    nome : "Calculadora",
    descricao: "Caso você não sabia fazer alguns calculos, isso é normal para algumas pessoas. Você pode usar ele para somar diversos números, basta você ultilizar esse comando."
  }