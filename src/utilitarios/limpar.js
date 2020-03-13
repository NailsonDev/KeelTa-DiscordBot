const Discord = require("discord.js");
const cooldown = new Set();
const fs = require('fs');
const config = require('../../config.json');

exports.run = (bot,message,args) => {
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

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**você não tem permissão.**");

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
        .setDescription(`Menu de ajuda do comando: **${prefix}Limpar**`)
        .addField('Comando:', `\`${prefix}Limpar\``)
        .addField('Tutorial:', `\`${prefix}Limpar <Número>\``)
        .addField('Alternativas:' , '\`Clear\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!args[0] || mensagemDeletar > 100 || mensagemDeletar < 2)  return message.reply(menu0).then(async msg => {
   
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

    let limpar = new Discord.RichEmbed()   
 
    message.channel.bulkDelete(mensagemDeletar).catch(error => message.reply("algumas mensagens não pode ser deletadas, porque tem mais de 14 dias. <:aviso:686628220333981700>")); 

    limpar.setTitle(`${message.guild.name}`)
    limpar.setDescription(`Limpando **${mensagemDeletar}** mensagens do servidor, no canal **${message.channel}**\n**Autor**: ${message.author}`)
    limpar.setColor('#6800e5')
    limpar.setFooter('Essa mensagem será deletada automaticamente.')
    message.channel.send(limpar).then( message => {
      message.delete(7000)
    })

    //message.channel.send(`> Foram limpas **${mensagemDeletar}** mensagens. <a:GhostWave:637060941481246743>\n> <a:redealert:637058611948027923> Este chat foi limpo por ${message.author}.`)
      
}


exports.help = {
  nome : "Clear",
  descricao: "Esse comando server para poder limpar o chat, evitar muitas mensagens desnecessárias."

}