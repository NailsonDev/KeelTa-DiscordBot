const Discord = require("discord.js");
let low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')
let adapter = new FileSync('contas.json')
let db = low(adapter)

exports.run = async (bot, message, args) => {


   let key = Number(args[0])

    if(isNaN(args[0]) && !args[1] > 9) { 

      let analise1 = new Discord.RichEmbed()

      .setTitle(`${bot.user.username} - Premium`)
      .setColor('RED')
      .setDescription("Token não é válido, tente novamente.")

      message.channel.send(analise1);

    } else {
       
      let analise = new Discord.RichEmbed()

      .setTitle(`${bot.user.username} - Premium`)
      .setColor('ORANGE')    
      .setDescription("**Token usado:** " + args.join(" ") + "\nEsse token já foi usado, ou não existe no bando de dados, tente outro novamente.\nStatus da key: **Inválido**.")
      
      message.channel.send(analise);
      
   }

 
   
}
exports.help = {
  nome : "Usarkey",
  descricao: "Ativação do Bot - Premium, apenas quem tem uma key pode usar."
}