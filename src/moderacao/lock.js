const Discord = require('discord.js')
const ms = require('ms');
const fs = require('fs');
const config = require('../../config.json');

exports.run = (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Você não tem permissão de `MANAGE_MESSAGES`");
  
  if (!bot.lockit) bot.lockit = [];
  

  let validade = ['bloquear', 'lock'];

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

  let prefix = prefixes[message.guild.id].prefixes; 

  if (validade) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false

    }).then(() => {
      message.channel.sendMessage(`Canal ${message.channel} foi bloqueado com sucesso! Use **${prefix}Unlock** para voltar.`)
      .then(() => {
      }).catch(error => {
        message.channel.send(" **`Ocorreu um erro na operação!`** ");
      });
    });
  } 

};

exports.help = {
  nome : "Lock",
  descricao: "Caso você não goste de muitas conversas, você pode bloquear o canal que deseja. Você também pode definir o tempo de espera.",
  aliases: "lock"
  
}