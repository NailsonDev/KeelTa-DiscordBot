const Discord = require("discord.js");
const fs = require("fs");
const config = require('../../config.json')
const cooldown = new Set()

exports.run = async (bot, message, args) => {

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  let prefix = prefixes[message.guild.id].prefixes

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

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("você não tem permissão de `ADMINISTRATOR`");
  
  const menu0 = new Discord.RichEmbed()  

    .setTitle('🚥 Menu')
    .setDescription(`Menu de ajuda do comando: **${message.content}**`)
    .addField('Comando:', `\`${message.content}\``)
    .addField('Tutorial:', `\`${message.content} <Prefix>\``)
    .addField('Alternativas:' , '\`Não informado.\`')
    .setColor('#6800e5')
    .setTimestamp()
    .setFooter(`${bot.user.username}`)

      if(!args[0])  return message.reply(menu0).then(async msg => {

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
          

  


  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  let icon = message.guild.iconURL
  sEmbed.setColor("6800e5")
  sEmbed.setTitle("Prefixo do servidor foi alterado.")
  sEmbed.addField(" Prefixo novo:", `"**${args[0]}**"`)
  sEmbed.setFooter('KeelTa - BOT')
  sEmbed.setThumbnail('https://media.discordapp.net/attachments/633072624737583119/645021139814580267/emoji.png')
  sEmbed.setTimestamp()
  message.channel.send(sEmbed);

}

exports.help = {
  nome : "Setprefix",
  descricao: "Esse comando serve para alterar o prefixo do bot no servidor."
}