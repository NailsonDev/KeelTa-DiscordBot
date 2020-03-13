const Discord = require('discord.js')
const ms = require('ms');
const fs = require('fs');
const config = require('../../config.json');

exports.run = (bot, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Você não tem permissão de `MANAGE_MESSAGES`");
  
  if (!bot.lockit) bot.lockit = [];
  

  let validUnlocks = ['block', 'lock'];

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

  let prefix = prefixes[message.guild.id].prefixes; 

  if (validUnlocks) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null

    }).then(() => {
      message.channel.sendMessage(`Canal ${message.channel} voltou ativa!`)
      .then(() => {
      }).catch(error => {
        message.channel.send(" **`Ocorreu um erro na operação!`** ");
      });
    });
  }

};

exports.help = {
  nome : "unLock",
  descricao: "Server para desbloquear um canal que já tá bloqueado, ele irá ativar a opção \`ler mensagens.\`",
  aliases: "unlock"
}