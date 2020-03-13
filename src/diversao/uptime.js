const Discord = require('discord.js')
const moment = require('moment')
const anuncio = require('../../anuncio.json')

module.exports.run = async (bot, message, args) => {

    const duration = moment.duration(bot.ontime)

    let u = convertMS(bot.uptime)
    let uptime = `**${u.h}**` + " Hora(s)" + `**${u.m}**` + " Minutos, " + `**${u.s}**` + " Segundos"
    
   // message.channel.send(`:hammer: | **${message.author.username}**, estou online há: ${uptime}`)  /// Caso queria usar sem EMBED, apenas apague os embed e deixa esse!
   let embed = new  Discord.RichEmbed()

   .setTitle(`Tempo que estou online!`)
   .setDescription(`**Estou online há** 🎟 \nHoras: **${u.h}**\nMinutos: **${u.m}**\nSegundos: **${u.s}**`)
   .setFooter('Mensagem será removida em 15s')
   .setColor("RANDOM")
   .setTimestamp()
   message.delete(0);
   return message.channel.send(embed).then(message => {
    message.delete(15000)
   })



    function convertMS(ms) {
        var d, h, m, s;
        s = Math.floor(ms / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;

        return {
            d: d
            , h: h
            , m: m
            , s: s
        };
    };
}

exports.help = {
    nome : "Uptime",
    descricao: "Esse comando serve para ver o tempo que eu estou Online."
  }