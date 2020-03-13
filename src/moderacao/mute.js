const Discord = require("discord.js");
const ms = require("ms");
const fs = require('fs')
const config = require('../../config.json')

module.exports.run = async (bot, message, args) => {
  
       if(message.guild === null)return;

  let jogador = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("você não tem permissão de `MUTE_MEMBERS`");

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
     .addField('Tutorial:', `\`${prefix}Mute <@Usuário> <1s/2s>\``)
     .addField('Alternativas:' , '\`Não informado.\`')
     .setColor('#6800e5')
     .setTimestamp()
     .setFooter(`${bot.user.username}`)

       if(!jogador)  return message.reply(menu0).then(async msg => {

               await msg.react("❓")

               let menu1 = new Discord.RichEmbed()  
 
               .setTitle('Informação.')
               .setDescription(`Quando for usar algum comando e você não sabe, você pode seguir o padrão abaixo:\n\n**Tutorial** - Serve para mostrar como ultilizar o comando.\n**Alternativas** - Mostrar todas alternativas dos comandos, ex: \`banir, ban e punir.\`\n\n \`<@Usuário>\` - Referência ao usuário da menção. (@SrDeDo_#0000)\n\`<Motivo>\` - A razão e pelo motivo da acusação.\n\`[Argumento]\` - Informe os argumentos necessário para o uso do comando, no caso são as mensagens. (Ex: ${prefix}say <argumento> / Mensagem que deseja.)`)
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

  let muterole = message.guild.roles.find(`name`, "silenciado");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "silenciado",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];

  if(!mutetime) return message.reply(baka);

  await(jogador.addRole(muterole.id));
  message.react('✅')

  let user = message.mentions.users.first();

  let mute = new Discord.RichEmbed()

   mute.setTitle(`<:repassar:642408832999358464> ${user.id}`, message.guild.name)
   mute.setDescription(`Olá prezado, você foi silenciado no servidor **${message.guild.name}**.`)
   mute.addField("Tipo de puniçao", `Mute`)
   mute.addField("Tempo restante:", `Falta: **${ms(ms(mutetime))}**`)
   mute.addField("Autor da punição:", message.author.tag)
   mute.setThumbnail(message.guild.iconURL)
   mute.setColor('RED')
   mute.setFooter(`${bot.user.username} - Moderação.`, message.client.user.avatarURL)

  jogador.send(mute);

  setTimeout(function(){

    jogador.removeRole(muterole.id);

    message.channel.send(`<@${jogador.id}>, **não está mais silenciado**! ⛔`);

    let mute1 = new Discord.RichEmbed()

    mute1.setTitle(`<:repassar:642408832999358464> ${user.id}`, message.guild.name)
    mute1.setDescription(`Olá **denovo**, só vim avisar que você não está mais silenciado no servidor **${message.guild.name}**!`)
    mute1.addField("Tipo de puniçao", `Mute`)
    mute1.setThumbnail(message.guild.iconURL)
    mute1.setColor('RED')
    mute1.setFooter(`${bot.user.username} - Moderação.`, message.client.user.avatarURL)
    
    jogador.send(mute1);

  }, ms(mutetime));

}

exports.help = {
  nome : "Mute",
  descricao: "Com esse comando você vai fazer os usuários ficarem MUDOS, você acha que alguns usuários está falando de mais, você pode mutar o mesmo por alguns minutos ou até dias...",
  aliases: "mute"
}