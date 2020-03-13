const discloud = require('discloud-status')
const Discord = require('discord.js')
const moment = require('moment')
exports.run = async(bot, message, args) => {

let status1 = new Discord.RichEmbed()

let icon = message.guild.iconURL

let r = discloud.ram(); // retorna o uso/total de RAM
let ur = discloud.usoRam(); // dados do uso de RAM
let tr = discloud.totalRam(); // dados do total de RAM disponível

let dados = 'Dados não encontrados ';
let coleta = r
let Total = r ? coleta : dados;

let dados1 = 'Dados não encontrados ';
let coleta1 = ur
let Total1 = ur ? coleta1 : dados1;

let dados2 = 'Dados não encontrados';
let coleta2 = tr
let Total2 = tr ? coleta2 : dados2;

const duration = moment.duration(bot.ontime)

    let u = convertMS(bot.uptime)
    let uptime = `**${u.h}** ` + " Hora(s) " + `**${u.m}** ` + " Minutos, " + `**${u.s}** ` + " Segundos"
    

const Status = new Discord.RichEmbed()

.setAuthor(`${message.author.username}`, `${message.author.avatarURL}`)
.setColor('#6800e5')
.setDescription(`<:id1:669322709456650240> Nome/ID: **${bot.user.tag}/${bot.user.id}**\n<:id2:669322709171437609> CPU: **0.06%**\n<:id3:669322709385347083> RAM: **${Total}**\n<:id4:669322709372633101> SSD: **${Total1}**\n<:id6:669322709158592513> Memória: **${Total2}**\n<:id7:669322709125169155> Último reinicio: ${uptime}`)
.setFooter('Créditos a Discloud.')
message.channel.send(Status)


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

module.exports.help = {
    name: "status"
}
