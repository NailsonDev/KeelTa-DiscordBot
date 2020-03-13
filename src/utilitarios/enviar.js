
const Discord = require('discord.js');
const fs = require('fs')
const config = require('../../config.json')

exports.run =  async(bot, message, args) => {

    if(!message.author == '638557582859960330') return message.channel.send('Não conseguir.')

    const args1 = args.join(" ").slice(22);

    let membro = message.content.toLowerCase(22).split(' ')
    membro = message.mentions.users.first()
    
    let mensagemDeletar = args.slice(0).join(" ");
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
        .addField('Tutorial:', `\`${prefix}Enviar <Texto>\``)
        .addField('Alternativas:' , '\`Não informado.\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!args1[0])  return message.reply(menu0).then(async msg => {
   
            
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

    message.reply('o jogador foi alertado com sucesso!')
    let embed = new Discord.RichEmbed()

    .setTitle(`⚠️ | Aviso`)
    .setDescription(`${args1}`)
    .setColor('#6800e5')
    .setFooter(`${membro.id}`)
    .setTimestamp()
    //.setThumbnail('https://i.imgur.com/MVGF2f4.jpg')

    membro.send(embed)


}