const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply("você não tem permissão de `BAN_MAMBERS`")
    let member = message.mentions.members.first()

    const user = message.mentions.users.first();
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }

    let prefix = prefixes[message.guild.id].prefixes;  

     ////////////////////
    const menu0 = new Discord.RichEmbed()  

     .setTitle('🚥 Menu')
     .setDescription(`Menu de ajuda do comando: **${message.content}**`)
     .addField('Comando:', `\`${message.content}\``)
     .addField('Tutorial:', `\`${prefix}Banir <@Usuário> <Motivo>\``)
     .addField('Alternativas:' , '\`Ban\`')
     .setColor('#6800e5')
     .setTimestamp()
     .setFooter(`${bot.user.username}`)

       if(!member)  return message.reply(menu0).then(async msg => {

               await msg.react("❓")

               let menu1 = new Discord.RichEmbed()  
 
               .setTitle('Informação.')
               .setDescription(`Quando for usar algum comando e você não sabe, você pode seguir o padrão abaixo:\n\n**Tutorial** - Serve para mostrar como ultilizar o comando.\n**Alternativas** - Mostrar todas alternativas dos comandos, ex: \`banir, ban e punir.\`\n\n \`<@Usuário>\` - Referência ao usuário da menção. (@SrDeDo_#0000)\n\`<Motivo>\` - A razão e pelo motivo da acusação.\n\`<Argumento>\` - Informe os argumentos necessário para o uso do comando, no caso são as mensagens. (Ex: ${prefix}say <argumento> - Mensagem que deseja.)`)
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
   

            ////////////////////

        if(!member.bannable)
        return message.reply("Eu não posso banir esse usuário, ele pode ter um cargo maior que o meu.")

        let reason = args.slice(1).join(' ');

   let anuncioembed = new Discord.RichEmbed()
   anuncioembed.setColor("RANDOM")
   anuncioembed.setDescription(`Você está presta a banir o ${user.toString()} você tem certeza?`)
   anuncioembed.setTimestamp();
   
   return message.channel.send(anuncioembed).then(async msg => {
   
        await msg.react("✅") 
        await msg.react("❌")

       const a1 = (reaction, user) => reaction.emoji.name ==='✅' && user.id === message.author.id
       const b1 = msg.createReactionCollector(a1, { time: 3000000 });
      
       const a2 = (reaction, user) => reaction.emoji.name ==='❌' && user.id === message.author.id
       const b2 = msg.createReactionCollector(a2, { time: 3000000 });
       
       b1.on("collect", c1 => {
        if(!reason) reason = "Não informado"
        member.ban(reason)
         .catch(error => message.reply(`Desculpe ${message.author} não consigo expulsar esse jogador, devido: ${error}`));

        let pEmbed = new Discord.RichEmbed()
        
        .setTitle("🚔 Punição.")
        .addField("Jogador punido:", user.toString())
        .addField("Autor:", `${message.author.tag}`,true)
        .addField("Motivo:", `${reason}`,true)
        .addField("ID da punição:", `\`${member.user.id}\``,true)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setColor("RED").setTimestamp()
        
         msg.channel.send(pEmbed)

})
b2.on("collect", c2 => {
    msg.delete(0) 
    
  })
})

}
exports.help = {
  nome : "Banir",
  descricao: "Um usuário está atrapalhando ou bagunçando no seu servidor? Não deixe use esse comando para banir ele.",
  aliases: "banir"
}