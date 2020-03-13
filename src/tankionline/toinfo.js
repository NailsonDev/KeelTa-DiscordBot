
const superagent = require("snekfetch");
const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');
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
  .addField('Tutorial:', `\`${prefix}Toinfo <Nickname>\``)
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

        
    superagent.get(`https://ratings.tankionline.com/api/eu/profile/?user=${args}`)

        .end((err, response,res) => {

            let golds = response.body.response.caughtGolds;
            let mortes = response.body.response.deaths;
            let crystal = response.body.response.earnedCrystals;
            let pontos = response.body.response.score;
            let nextPatente = response.body.response.scoreNext;
            let nome = response.body.response.name;

            let vipteste = 'Não tem conta premium!'
            let vipteste2 = 'Conta premium! <:Premium_item:680246734215184384>'

            let vip = response.body.response.hasPremium ? vipteste2 : vipteste;

            let abates = response.body.response.kills;
            let ranks = response.body.response.rank;
            let gs = response.body.response.gearScore;

if((response.body.response.rank) == 1) {
    rank = '<:1:680246781535059980> Recruta'
    rankimg = 'recruit'
} else if ((response.body.response.rank) == 2) {
   rank = '<:2:680246781535191042> Soldado'
   rankimg = 'private'
} else if ((response.body.response.rank) == 3) {
   rank = '<:4_:680246782047027210> Taifeiro'
   rankimg = 'private'
} else if ((response.body.response.rank) == 4) {
   rank = '<:3_:680246781640179733> Cabo'
   rankimg = 'private'
} else if ((response.body.response.rank) == 5) {
  rank = '<:5:680246781950427136> Taifeiro-mor '
   rankimg = 'private'
} else if ((response.body.response.rank) == 6) {
  rank = '<:6:680246782001020934> Sargento'
   rankimg = 'private'
} else if ((response.body.response.rank) == 7) {
  rank = '<:7:680246781732323379> Terceiro-sargento'
  rankimg = 'private'
} else if ((response.body.response.rank) == 8) {
  rank = '<:8:680246781807820855> Segundo-sargento'
  rankimg = 'private'
} else if ((response.body.response.rank) == 9) {
  rank = '<:9:680246781946363904> Primeiro-sargento'
  rankimg = 'private'
} else if ((response.body.response.rank) == 10) {
  rank = '<:10:680246781967335472> Sargento-mor '
  rankimg = 'private'
} else if ((response.body.response.rank) == 11) {
  rank = '<:11:680246782063542326> Subtenente 1 '
  rankimg = 'private'
} else if ((response.body.response.rank) == 12) {
  rank = '<:12:680246782030249993> Subtenente 2 '
  rankimg = 'private'
} else if ((response.body.response.rank) == 13) {
  rank = '<:13:680246781937713227> Subtenente 3 '
  rankimg = 'private'
} else if ((response.body.response.rank) == 14) {
  rank = '<:14:680246781980049414> Subtenente 4 '
  rankimg = 'private'
} else if ((response.body.response.rank) == 15) {
  rank = '<:15:680246781594042399> Subtenente 5 '
  rankimg = 'private'
} else if ((response.body.response.rank) == 16) {
  rank = '<:16:680246782030118927> Aspirante-a-Oficial '
  rankimg = 'private'
} else if ((response.body.response.rank) == 17) {
  rank = '<:17:680246781916741634> Segundo-tenente '
  rankimg = 'private'
} else if ((response.body.response.rank) == 18) {
  rank = '<:18:680246781899964416 Primeiro-tenente '
  rankimg = 'private'
} else if ((response.body.response.rank) == 19) {
  rank = '<:19:680246781849764027> Capitão '
  rankimg = 'private'
} else if ((response.body.response.rank) == 20) {
  rank = '<:20:680246782030118915> Major '
  rankimg = 'private'
} else if ((response.body.response.rank) == 21) {
  rank = '<:21:680246782038638598> Tenente-coronel '
  rankimg = 'private'
} else if ((response.body.response.rank) == 22) {
  rank = '<:22:680246781640179751> Coronel '
  rankimg = 'private'
} else if ((response.body.response.rank) == 23) {
  rank = '<:23:680246782046765184>  Brigadeiro '
  rankimg = 'private'
} else if ((response.body.response.rank) == 24) {
  rank = '<:24:680246782055547032> General de Brigada '
  rankimg = 'private'
} else if ((response.body.response.rank) == 25) {
  rank = '<:25:680246782063542274> General de Divisão '
  rankimg = 'private'
} else if ((response.body.response.rank) == 26) {
  rank = '<:26:680246781635985424> General de Exército '
  rankimg = 'private'
} else if ((response.body.response.rank) == 27) {
  rank = '<:27:680246781916741653> Marechal '
  rankimg = 'private'
} else if ((response.body.response.rank) == 28) {
  rank = '<:28:680246781850026048> Marechal de Campos '
  rankimg = 'private'
} else if ((response.body.response.rank) == 29) {
  rank = '<:29:680246782030250150> Comadante '
  rankimg = 'private'
} else if ((response.body.response.rank) == 30) {
  rank = '<:30:680246782030250053> Generalissimo '
  rankimg = 'private'
} else if ((response.body.response.rank) == 31) {
  rank = '<:31:680246782030250049> Lenda '
  rankimg = 'private'
} else if ((response.body.response.rank) == 32) {
  rank = '<:31:680246782030250049> Lenda 1'
  rankimg = 'private'
} else if ((response.body.response.rank) == 32) {
  rank = '<:31:680246782030250049> Lenda 2'
  rankimg = 'private'
} else if ((response.body.response.rank) == 33) {
  rank = '<:31:680246782030250049> Lenda 3'
  rankimg = 'private'
} else if ((response.body.response.rank) == 34) {
  rank = '<:31:680246782030250049> Lenda 4'
  rankimg = 'private'
} else if ((response.body.response.rank) == 35) {
  rank = '<:31:680246782030250049> Lenda 5'
  rankimg = 'private'
} else if ((response.body.response.rank) == 36) {
  rank = '<:31:680246782030250049> Lenda 6'
  rankimg = 'private'
} else if ((response.body.response.rank) == 37) {
  rank = '<:31:680246782030250049> Lenda 7'
  rankimg = 'private'
} else if ((response.body.response.rank) == 38) {
  rank = '<:31:680246782030250049> Lenda 8'
  rankimg = 'private'
} else if ((response.body.response.rank) == 39) {
  rank = '<:31:680246782030250049> Lenda 9'
  rankimg = 'private'
} else if ((response.body.response.rank) == 40) {
  rank = '<:31:680246782030250049> Lenda 10'
  rankimg = 'private'
} else if ((response.body.response.rank) == 41) {
  rank = '<:31:680246782030250049> Lenda 11'
  rankimg = 'private'
} else if ((response.body.response.rank) == 42) {
  rank = '<:31:680246782030250049> Lenda 12'
  rankimg = 'private'
} else if ((response.body.response.rank) == 43) {
  rank = '<:31:680246782030250049> Lenda 13'
  rankimg = 'private'
} else if ((response.body.response.rank) == 44) {
  rank = '<:31:680246782030250049> Lenda 14'
  rankimg = 'private'
} else if ((response.body.response.rank) == 45) {
  rank = '<:31:680246782030250049> Lenda 15'
  rankimg = 'private'
} else if ((response.body.response.rank) == 46) {
  rank = '<:31:680246782030250049> Lenda 16'
  rankimg = 'private'
} else if ((response.body.response.rank) == 47) {
  rank = '<:31:680246782030250049> Lenda 17'
  rankimg = 'private'
} else if ((response.body.response.rank) == 48) {
  rank = '<:31:680246782030250049> Lenda 18'
  rankimg = 'private'
} else if ((response.body.response.rank) == 49) {
  rank = '<:31:680246782030250049> Lenda 19'
  rankimg = 'private'
} else if ((response.body.response.rank) == 50) {
  rank = '<:31:680246782030250049> Lenda 20'
  rankimg = 'private'
} else if ((response.body.response.rank) == 51) {
  rank = '<:31:680246782030250049> Lenda 21'
  rankimg = 'private'
} else if ((response.body.response.rank) == 52) {
  rank = '<:31:680246782030250049> Lenda 22'
  rankimg = 'private'
} else if ((response.body.response.rank) == 53) {
  rank = '<:31:680246782030250049> Lenda 23'
  rankimg = 'private'
} else if ((response.body.response.rank) == 54) {
  rank = '<:31:680246782030250049> Lenda 24'
  rankimg = 'private'
} else if ((response.body.response.rank) == 55) {
  rank = '<:31:680246782030250049> Lenda 25'
  rankimg = 'private'
} else if ((response.body.response.rank) == 56) {
  rank = '<:31:680246782030250049> Lenda 26'
  rankimg = 'private'
} else if ((response.body.response.rank) == 57) {
  rank = '<:31:680246782030250049> Lenda 27'
  rankimg = 'private'
} else if ((response.body.response.rank) == 58) {
  rank = '<:31:680246782030250049> Lenda 28'
  rankimg = 'private'
} else if ((response.body.response.rank) == 59) {
  rank = '<:31:680246782030250049> Lenda 29'
  rankimg = 'private'
} else if ((response.body.response.rank) == 60) {
  rank = '<:31:680246782030250049> Lenda 30'
  rankimg = 'private'
} else if ((response.body.response.rank) == 61) {
  rank = '<:31:680246782030250049> Lenda 31'
  rankimg = 'private'
} else if ((response.body.response.rank) == 62) {
  rank = '<:31:680246782030250049> Lenda 32'
  rankimg = 'private'
} else if ((response.body.response.rank) == 63) {
  rank = '<:31:680246782030250049> Lenda 33'
  rankimg = 'private'
} else if ((response.body.response.rank) == 64) {
  rank = '<:31:680246782030250049> Lenda 34'
  rankimg = 'private'
} else if ((response.body.response.rank) == 65) {
  rank = '<:31:680246782030250049> Lenda 35'
  rankimg = 'private'
} else if ((response.body.response.rank) == 66) {
  rank = '<:31:680246782030250049> Lenda 36'
  rankimg = 'private'
} else if ((response.body.response.rank) == 67) {
  rank = '<:31:680246782030250049> Lenda 37'
  rankimg = 'private'
} else if ((response.body.response.rank) == 68) {
  rank = '<:31:680246782030250049> Lenda 38'
  rankimg = 'private'
} else if ((response.body.response.rank) == 69) {
  rank = '<:31:680246782030250049> Lenda 39'
  rankimg = 'private'
} else if ((response.body.response.rank) == 70) {
  rank = '<:31:680246782030250049> Lenda 40'
  rankimg = 'private'
}

          let convites = Math.floor((Math.random() * 20) + 0);

              if (convites == 14) {
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 9){
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 4){
               message.reply(`${anuncio.anuncio}`)
             } 

            const lewdembed = new Discord.RichEmbed()
                   
                 .setTitle(`<:TO:680148810726506594> Tanki Online - ${bot.user.username}`)
                 .setDescription(`**Informações do**: ${nome}\n\nCaixas douradas capturadas: **${golds}**\n\nGS: **${gs}**\nPatente: **${rank}**\nExperiência: **${pontos} / ${nextPatente}**\n\nTotal de abates: **${abates}**\nTotal de mortes: **${mortes}**\nCristais ganhos: **${crystal}**\nJogador: **${vip}**\n\nPatente level: **${ranks}**\nServidor: **EN** :flag_um:`)
                 .setColor('ORANGE')
                 .setTimestamp()
                 .setThumbnail('https://i.imgur.com/bjs3nfB.png')
                 .setFooter(bot.user.username, bot.user.avatarURL)
                 //console.log(response.body.response)
                  message.channel.send(lewdembed)
                }).catch(O_o => {
                  message.channel.send('> Não consegui achar esse usuário.')
                })
              }
            
exports.help = {
    nome : "Toinfo",
    descricao: "Obterá algumas informações de um usuário no game."
  }