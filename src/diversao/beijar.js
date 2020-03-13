
const Discord = require("discord.js");
const superagent = require("snekfetch");
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

module.exports.run = async(bot, message, args) => {

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
        .addField('Tutorial:', `\`${prefix}Beijar <@Usuário>\``)
        .addField('Alternativas:' , '\`Kiss\`')
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
            
             const user = message.mentions.users.first();

        superagent.get('https://nekos.life/api/v2/img/kiss')
            .end((err, response) => {

          const lewdembed = new Discord.RichEmbed()

          let convites = Math.floor((Math.random() * 20) + 0);

          if (convites == 14) {
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 9){
           message.reply(`${anuncio.anuncio}`)
         } else if (convites == 4){
           message.reply(`${anuncio.anuncio}`)
         }  

    lewdembed.setImage(response.body.url)
    lewdembed.setColor(`RANDOM`)
    lewdembed.setDescription(("💏 " + message.author.toString() + " **beijou** " + user.toString()))
    lewdembed.setFooter(`Clique em ✅ para retribuir!`)
    lewdembed.setURL(response.body.url); 

         message.reply(lewdembed).then(async msg => {

            await msg.react("✅")

            const a2 = (reaction, user) => reaction.emoji.name ==='✅' && user.id === message.author.id
            const b2 = msg.createReactionCollector(a2, { time: 300000 });
           
            b2.on("collect", c2 => {    
              superagent.get('https://nekos.life/api/v2/img/kiss')
              .end((err, response) => {

            let embed = new Discord.RichEmbed()

             .setImage(response.body.url)
             .setColor(`RANDOM`)
             .setDescription(("💏 " + message.author.toString() + " **beijou** " + user.toString()))
             .setFooter(`${bot.user.username}`)
             .setURL(response.body.url); 
            msg.reply(embed)
             c2.remove(message.author.id)
            })
               
        })
     })        
  })
}

exports.help = {
  nome : "Beijar",
  descricao: "Comando de diversão, use esse comando para poder animar um pouco as coisas no seu servidor. Caso esteja apaixonado use ele para beijar a pessoa do seus sonhos."
}