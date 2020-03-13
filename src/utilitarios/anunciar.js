const Discord = require('discord.js')
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot, message, args) => {

        if (cooldown.has(message.author.id)) {
            let cooldownemb = new Discord.RichEmbed()

            .setAuthor(`${message.author.username} espere...`, message.author.displayAvatarURL)
            .setDescription(`Você precisa esperar um pouco para executar novamente!`)
            .setColor(`RED`)
            .setFooter(`Está bem, vou esperar. ⛔`)

            return message.channel.send(cooldownemb).then(message => {
             message.react('⛔') 
            })
        }
            cooldown.add(message.author.id);

            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 3000);

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão de `ADMINISTRATOR`")
        message.delete(200).catch()

        let splitarg = args.join(" ").split(0)
        let anuncio = splitarg[0]

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
        .addField('Tutorial:', `\`${prefix}Anunciar <Texto>\``)
        .addField('Alternativas:' , '\`Não informado.\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!anuncio)  return message.reply(menu0).then(async msg => {
   
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

        let aviso = new Discord.RichEmbed()
        aviso.setColor("#6800e5")
        aviso.setDescription(`Ao usar **${prefix}anunciar**, você estará prestes a mencionar várias pessoas. Tem certeza?`)
        aviso.setTimestamp()

        return message.channel.send(aviso).then(async msg => {

             msg.react("✅")

            let aviso1 = new Discord.RichEmbed()  

           .setAuthor(`${message.guild.name}`,`${message.guild.iconURL}`)
            .setColor("#6800e5")
            .setDescription(`${anuncio}`)
            .setFooter(`Publicado por ${message.author.tag}`)
            .setTimestamp()

            const a1 = (reaction, user) => reaction.emoji.name ==='✅' && user.id === message.author.id
            const b1 = msg.createReactionCollector(a1, { time: 1300000 });
           
            b1.on("collect", c1 => {
            msg.delete(aviso)
            msg.channel.send(aviso1).then(msg => {
            msg.edit('@everyone')
         })
            msg.edit(aviso)
            c1.remove(message.author.id)

       })
       

    })
}

exports.help = {
    nome : "Anunciar",
    descricao: "Esse comando serve para fazer anúncios em seu servidor, caso precise mencionar todos do server use ele para fazer algum tipo de anúncio ou até mesmo um aviso."
  }