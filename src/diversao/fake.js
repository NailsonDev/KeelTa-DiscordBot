const fs = require('fs');
const config = require('../../config.json');
const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

module.exports.run = async (bot, message, args) => {
    message.delete();
          try {
    let user;
  
      if (message.mentions.users.first()) {
        user = message.mentions.users.first();
        
      } else if(args[0]) {
          user = bot.users.get(args[0]);
      
      }
    let botmessage = args.slice(1).join(' ')
   
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[message.guild.id]){
          prefixes[message.guild.id] = {
            prefixes: config.prefix
          };
        }

        let prefix = prefixes[message.guild.id].prefixes; 

        const menu0 = new Discord.RichEmbed()  

        .setTitle('🚥 Menu')
        .setDescription(`Menu de ajuda do comando: **${message.content}**`)
        .addField('Comando:', `\`${message.content}\``)
        .addField('Tutorial:', `\`${prefix}Fake <@Usuário> [Texto]\``)
        .addField('Alternativas:' , '\`Não informado.\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!args[0] || !args[1])  return message.reply(menu0).then(async msg => {
   
                  await msg.react("❓")
   
                  let menu1 = new Discord.RichEmbed()  
    
                  .setTitle('Informação.')
                  .setDescription(`Quando for usar algum comando e você não sabe, você pode seguir o padrão abaixo:\n\n**Tutorial** - Serve para mostrar como ultilizar o comando.\n**Alternativas** - Mostrar todas alternativas dos comandos, ex: \`banir, ban e punir.\`\n\n \`<@Usuário>\` - Referência ao usuário da menção. (@SrDeDo_#0000)\n\`<Motivo>\` - A razão e pelo motivo da acusação.\n\`[Texto]\` - Informe os argumentos necessário para o uso do comando, no caso são as mensagens. (Ex: ${prefix}say <argumento> / Mensagem que deseja.)`)
                  .setFooter(bot.user.username, bot.user.avatarURL)
                  .setColor('#6800e5')
                  .setTimestamp()
   
                  const a1 = (reaction, user) => reaction.emoji.name ==='❓' && user.id === message.author.id
                  const b1 = msg.createReactionCollector(a1, { time: 300000 });
                 
                   b1.on("collect", c1 => {
                   msg.delete(menu0)
                   msg.channel.send(menu1)
                    .then(async msg => {
              
                    msg.react('⬅️')
              
                    const a2 = (reaction, user) => reaction.emoji.name ==='⬅️' && user.id === message.author.id
                    const b2 = msg.createReactionCollector(a2, { time: 500000 });
              
                    b2.on("collect", c2 => { 
                    msg.delete(menu1)
                    msg.channel.send(menu0)
                    
                    })
                  }) 
                })  
               })

               let convites = Math.floor((Math.random() * 20) + 0);

               if (convites == 14) {
                message.reply(`${anuncio.anuncio}`)
              } else if (convites == 9){
                message.reply(`${anuncio.anuncio}`)
              } else if (convites == 4){
                message.reply(`${anuncio.anuncio}`)
              } 

      message.channel.createWebhook(user.username, user.avatarURL).then(w => {
          w.send(botmessage);
          w.delete();
      })
      
  } catch (err) {
      message.channel.send('> Eu não tenho permissão para criar um Webhook neste servidor, ou não encontrei este usuário.')
     }
  }
  
  exports.help = {
    nome : "Fake",
    descricao: "Tá afim de trollar seu amigo? Use esse comando para criar um usuário fake e escrever mensagens engraçadas."
  }