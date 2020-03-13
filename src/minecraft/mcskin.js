const Discord = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = (bot, message, args) => {

    let skin = args.slice(0).join(' ');
 
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
    .addField('Tutorial:', `\`${prefix}Skin <Nickname>\``)
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

    let skin1 = new Discord.RichEmbed()
 
    let convites = Math.floor((Math.random() * 20) + 0);

              if (convites == 14) {
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 9){
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 4){
               message.reply(`${anuncio.anuncio}`)
             } 

    skin1.setTitle(`Nick: **${args[0]}**`)
    .setColor("#6800e5")
    .setImage(`https://mc-heads.net/body/${args[0]}`)
    .setDescription(`**[Clique aqui](https://mc-heads.net/download/${args[0]})** para baixar: 📥`)
    .setFooter(`${bot.user.username}`, `${message.author.avatarURL}`)
    .setTimestamp()
    message.channel.send(skin1)
};

exports.help = {
  nome : "Skin",
  descricao: "Quer saber uma skin legal? Ou saber uma skin de um amigo seu? Esse comando é o certo! Use ele para ver outras skin de outros jogadores."
}