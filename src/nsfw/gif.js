
const superagent = require("snekfetch");
const Discord = require('discord.js')
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = async (bot, message, args) => {

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

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }
        let prefix = prefixes[message.guild.id].prefixes; 

        let convites = Math.floor((Math.random() * 20) + 0);

           if (convites == 14) {
            message.reply(`${anuncio.anuncio}`)
          } else if (convites == 9){
            message.reply(`${anuncio.anuncio}`)
          } else if (convites == 4){
            message.reply(`${anuncio.anuncio}`)
          } 

    const user = message.mentions.users.first();

    if(!message.channel.nsfw) return message.channel.send('> 💔 Esse comando é **conteúdo adulto**, por tanto preciso estar em algum canal **NSFW**!') 

    var nomesTexto = [
        'Hum, nice!',
        'Uow, nice!',
        'Nice food!',
        'Hentai!',
        'Nicee!',
        'Que tal esse?'
    ]
    var nome = nomesTexto[Math.round(Math.random() * (nomesTexto.length - 1))];

    superagent.get('https://nekos.life/api/v2/img/Random_hentai_gif')
        .end((err, response) => {

      const nsfwBom = new Discord.RichEmbed()

      .setTitle(`💖 ${nome}`)
      .setImage(response.body.url)
      .setColor(`#6800e5`)
      .setFooter(`${bot.user.username}`, bot.user.avatarURL)
      .setTimestamp()
      .setURL(response.body.url);

   message.channel.send(nsfwBom)
   .then(message => {
    message.react('🥵') 

       })
   })	
}



exports.help = {
    nome: "Keta",
    descricao: null
}