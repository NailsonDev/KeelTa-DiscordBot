
const superagent = require("snekfetch");
const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');
const dados = require('../../esse.json')
const anuncio = require('../../anuncio.json')

exports.run = async (bot, message, args) => {

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
  .addField('Tutorial:', `\`${prefix}Mcserver <IP>\``)
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


    superagent.get(`https://api.mcsrvstat.us/2/${args}`)

        .end((err, response) => {

            if(!dados[message.author.id]){
                dados[message.author.id] = {
                    dados: response.body.players
                };
              }
              
            let online1 = 'Online!'
            let offline1 = 'Offline!'

            let On = response.body.online ? online1 : offline1

            let version1 = 'Não disponível.'
            let version2 = response.body.version

            let Versionn = response.body.version ? version2 : version1

            let hostnamee = 'Não disponível.'
            let host1 = response.body.hostname

            let host = response.body.hostname ? host1 : hostnamee
            
            let online = response.body.players.online
            let maximo = response.body.players.max

            let convites = Math.floor((Math.random() * 20) + 0);

            if (convites == 14) {
             message.reply(`${anuncio.anuncio}`)
           } else if (convites == 9){
             message.reply(`${anuncio.anuncio}`)
           } else if (convites == 4){
             message.reply(`${anuncio.anuncio}`)
           } 

            const lewdembed = new Discord.RichEmbed()

                 .setTitle(`Buscando por: ${args.join(" ")}`)
                 .setDescription(`**Status**: ${On}\n**Versão**: ${Versionn}\n**Jogadores**: \`${online}\` / \`${maximo}\`\n**IP**: \`${args}\`\n**Hostname**: \`\`\`${host}\`\`\``)
                 .setColor('#6800e5')
                 .setTimestamp()
                 .setThumbnail(`https://api.mcsrvstat.us/icon/${args}`)
                 .setFooter(bot.user.username)
                  message.channel.send(lewdembed)
                }).catch(O_o => {
                  message.channel.send('> Não consegui achar esse servidor.')
                })
              }

exports.help = {
    nome : "Mcserver",
    descricao: "Obterá algumas informações de um servidor."
  }