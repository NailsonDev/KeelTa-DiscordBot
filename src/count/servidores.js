
const Discord = require('discord.js');

exports.run = async(bot, message, args) => {

   if(message.author.id == '638557582859960330') {

    let membros = bot.guilds.get('654447497225306152')
    membros.channels.get('675900444395962398').setName("Servidores: " + bot.guilds.size + "")
     
   }else {
       message.channel.send('Comando exclusivo apenas para os CEOs do BOT.')
    }
}


exports.help = {
  nome : null,
  descricao: null
}