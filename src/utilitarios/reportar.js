const Discord = require("discord.js");
const fs = require('fs');
const config = require('../../config.json');

module.exports.run = async(bot, message, args) => {
  
  message.delete(1000).catch(O_o=>{}); 

  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

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
     .addField('Tutorial:', `\`${prefix}Reportar <Usuário> <Motivo>\``)
     .addField('Alternativas:' , '\`Não informado.\`')
     .setColor('#6800e5')
     .setTimestamp()
     .setFooter(`${bot.user.username}`)

       if(!rUser)  return message.reply(menu0).then(async msg => {

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

  .catch(O_o=>{});
  
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reportes")
    .setColor("#E5DA2A")
    .addField("Acusado:", `${rUser} ID: ${rUser.id}`)
    .addField("Vitíma:", `${message.author} ID: ${message.author.id}`)
    .addField("Canal:", message.channel)
    .addField("Dia:", message.createdAt)
    .addField("Motivo:", reason);


    let reportschannel = message.guild.channels.find(`name`, "reportes");
    if(!reportschannel) return message.channel.send(":x: | Não consegui achar o chat `reportes`.")
    .then(message => [
      message.delete(4000)
    ])
  
  
    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
}

exports.help = {
  nome : "Reportar",
  descricao: null
}
