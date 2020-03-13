const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');

exports.run = async(bot, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão de `ADMINISTRATOR`")
        message.delete(2000).catch()

        let splitarg = args.join(" ").split(" / ")

        let votacao = splitarg[0]

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
        .addField('Tutorial:', `\`${prefix}Votar [Texto]\``)
        .addField('Alternativas:' , '\`Não informado.\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!votacao)  return message.reply(menu0).then(async msg => {
   
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

let nomedaguild = message.guild

let anuncioembed = new Discord.RichEmbed()
anuncioembed.setColor("RANDOM")
anuncioembed.setDescription(`Ao usar **${prefix}votar**, você estará prestes a mencionar várias pessoas. Tem certeza?`)
anuncioembed.setFooter('Você tem 13s para concordar, ou exclua essa mensagem.')
anuncioembed.setTimestamp();

return message.channel.send(anuncioembed).then(async msg => {

  if(args.length < 1) { return; }

     msg.react("✅") 

    let anuncioembed = new Discord.RichEmbed()  

    .setAuthor(`${message.guild.name}`,`${message.author.avatarURL}`)
    .setColor("RANDOM")
    .setDescription(`${votacao}`)
    .setColor('#fe1862')
    .setFooter(`By: ${message.author.tag}`, `${message.author.avatarURL}`)
    .setTimestamp();

    const a1 = (reaction, user) => reaction.emoji.name ==='✅' && user.id === message.author.id
    const b1 = msg.createReactionCollector(a1, { time: 5000 });

   
b1.on("collect", c1 => {
    msg.edit(anuncioembed)
    msg.edit('@everyone')
    c1.remove(message.author.id) 
    msg.react("⛔")

       })
    })
}

exports.help = {
  nome : "Votar",
  descricao: "Inicie uma votação no servidor com esse comando."
}