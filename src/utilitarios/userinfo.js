
const Discord = require("discord.js");
const moment = require("moment");
moment.locale('pt-BR');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = async (bot, message, args) => {
  var mention = message.guild.member(message.mentions.users.first());

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
    .addField('Tutorial:', `\`${prefix}Userinfo <@Usuário>\``)
    .addField('Alternativas:' , '\`Não informado.\`')
    .setColor('#6800e5')
    .setTimestamp()
    .setFooter(`${bot.user.username}`)

      if(!mention)  return message.reply(menu0).then(async msg => {

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

  let userlol = new Discord.RichEmbed()

   let online1 = '✅ | Online'
   let offline1 = '❌ | Offline'
   let total = mention.presence.status ? online1 : offline1
   let convites = Math.floor((Math.random() * 20) + 0);

   if (convites == 14) {
    message.reply(`${anuncio.anuncio}`)
  } else if (convites == 9){
    message.reply(`${anuncio.anuncio}`)
  } else if (convites == 4){
    message.reply(`${anuncio.anuncio}`)
  } 

  userlol.setThumbnail(mention.user.avatarURL)
  userlol.setColor("#6800e5")
  userlol.setAuthor(message.author.username, message.author.avatarURL)
  userlol.setTitle(`Informações do usuário ${mention.user.username} 📲`)
  userlol.addField(`📥 Conta foi criada no dia:`, moment(mention.user.createdAt).format('LLL'))
  userlol.addField(`🔰 Primeiro login:`, moment(mention.user.joinedAt).format('LLL'))
  userlol.addField(`🏷 Cargos do usuário:`, mention.roles.filter((r) => r.name !== '@everyone').map((role) => role).join(', '))
  userlol.addField(`🌐 Status do ${mention.user.username}`, `${total}`)
  userlol.addField(`⚠️ Username:`, mention.user.tag)
  userlol.addField(`🔱 ID:`, '\`' + mention.user.id + '\`') 

  message.channel.send(userlol).catch(userlol)
}

exports.help = {
  nome : "Userinfo",
  descricao: "Com esse comando você saberá suas informações e de outros usuários."
}