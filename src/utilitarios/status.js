const discloud = require('discloud-status')
const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

exports.run = async(bot, message, args) => {

let status1 = new Discord.RichEmbed()

let icon = message.guild.iconURL

let r = discloud.ram(); // retorna o uso/total de RAM
let ur = discloud.usoRam(); // dados do uso de RAM
let tr = discloud.totalRam(); // dados do total de RAM disponível

let dados = 'Dados não encontrados <a:negada:637061409221509132>';
let coleta = r
let Total = r ? coleta : dados;

let dados1 = 'Dados não encontrados <a:negada:637061409221509132>';
let coleta1 = ur
let Total1 = ur ? coleta1 : dados1;

let dados2 = 'Dados não encontrados <a:negada:637061409221509132>';
let coleta2 = tr
let Total2 = tr ? coleta2 : dados2;

status1.setTitle(`Status do(a) ${bot.user.username}`)
status1.setColor('RANDOM')

status1.addField('Uso/total de RAM', Total)
status1.addField('Dados do uso de RAM', Total1)
status1.addField('Dados do total de RAM disponível', Total2)

status1.setFooter(bot.user.username)
status1.setTimestamp()
status1.setThumbnail(icon)

message.channel.send(status1)

/**
 * Comando criado por SrDeDo_
 **/

}

module.exports.help = {
    name: "status"
}
