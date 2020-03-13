const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("você não tem permissão de `KICK_MEMBERS`")
    let member = message.mentions.members.first()

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
     .addField('Tutorial:', `\`${prefix}Kick <@Usuário> <Motivo>\``)
     .addField('Alternativas:' , '\`Não informado.\`')
     .setColor('#6800e5')
     .setTimestamp()
     .setFooter(`${bot.user.username}`)

       if(!member)  return message.reply(menu0).then(async msg => {

               await msg.react("❓")

               let menu1 = new Discord.RichEmbed()  
 
               .setTitle('Informação.')
               .setDescription(`Quando for usar algum comando e você não sabe, você pode seguir o padrão abaixo:\n\n**Tutorial** - Serve para mostrar como ultilizar o comando.\n**Alternativas** - Mostrar todas alternativas dos comandos, ex: \`banir, ban e punir.\`\n\n \`<@Usuário>\` - Referência ao usuário da menção. (@SrDeDo_#0000)\n\`<Motivo>\` - A razão e pelo motivo da acusação.\n\`[Argumento]\` - Informe os argumentos necessário para o uso do comando, no caso são as mensagens. (Ex: ${prefix}say <argumento> / Mensagem que deseja.)`)
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

    if(!member.kickable)
      return message.reply("eu não posso expulsar esse jogador, ele tem um cargo maior que o meu.")
    let reason = args.join(' ').slice(22);
    if(!reason) reason = "Não foi informado."
    await member.kick(reason)
      .catch(error => message.reply(`Desculpe ${message.author} não consigo expulsar esse jogador, devido: ${error}`))

      message.channel.send(`${message.author}`)

      let pEmbed = new Discord.RichEmbed()
          .setTitle("<:432:669324217950404608> Punição.")
          .addField("Jogador expulso:", `${member.user.tag}`)
          .addField("Autor:", `${message.author.tag}`)
          .addField("Motivo:", `${reason}`)
          .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
          .setColor("RANDOM").setTimestamp()

          message.channel.send(pEmbed)
          
}

exports.help = {
  nome : "Kick",
  descricao: "Achou alguém bagunçando ou atrapalhando no seu servidor? Não deixe-o fazer isso, use esse comando para expulsa-lo do servidor.",
  aliases: "kick"
}