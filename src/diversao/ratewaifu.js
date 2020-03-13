
const Discord = require('discord.js')
const cooldown = new Set()
const fs = require('fs');
const config = require('../../config.json');
const anuncio = require('../../anuncio.json')

exports.run = (bot, message, args) => {

  if (cooldown.has(message.author.id)) {

    let cooldownemb = new Discord.RichEmbed()

    .setAuthor(`${message.author.username}, espere...`, message.author.displayAvatarURL)
    .setDescription(`Você precisa aguardar 5 segundos, antes de enviar outra mensagem.`)
    .setColor(`RED`)
    .setFooter(`Mensagem será deletada em 5 segundos...`)

    return message.channel.send(cooldownemb).then(message => {

     message.delete(5000)})}
     cooldown.add(message.author.id);

    setTimeout(() => { cooldown.delete(message.author.id) ; }, 3000);

 let msg = args.join(" ");

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
        .addField('Tutorial:', `\`${prefix}Ratewaifu [Nomes]\``)
        .addField('Alternativas:' , '\`Não informado.\`')
        .setColor('#6800e5')
        .setTimestamp()
        .setFooter(`${bot.user.username}`)
   
          if(!msg)  return message.reply(menu0).then(async msg => {
   
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
         
  if (msg.length > 30) return message.channel.send(`Precisa no mínimo 30 letras!`)

  let nota = Math.floor((Math.random() * 10) + 0);

  let convites = Math.floor((Math.random() * 20) + 0);

  if (convites == 14) {
   message.reply(`${anuncio.anuncio}`)
 } else if (convites == 9){
   message.reply(`${anuncio.anuncio}`)
 } else if (convites == 4){
   message.reply(`${anuncio.anuncio}`)
 } 
  
  if (nota == 1) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Meu Deus, recomendo trocar de Waifu AGORA!**`)
  if (nota == 2) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Credo, acho melhor trocar de Waifu, confia ne mim que vai ser melhor!**`)
  if (nota == 3) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Tente outro, Esse ficou ruim, prefiro SrDeDo_ (Risos)**`)
  if (nota == 4) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Mais ou menos, continua no caminho, vai dar certo, logo logo você irá achar uma Waifu boa...**`)
  if (nota == 5) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Ficou bom, não que seja ruim, só está faltando capacidade mesmo.**`)
  if (nota == 6) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Olha. Ficou bom, mas não é interessante... **`)
  if (nota == 7) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Nem todas as Waifus são perfeitas, mas tá aceitavel...**`)
  if (nota == 8) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Uma Waifu que mereça todos os bons da humanidade.**`)
  if (nota == 9) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**!  \n **Perfeito! Mas nem todas Waifu é perfeitas como deseja.**`)
  if (nota == 10) return message.reply(` eu dou uma nota **${nota}/10** para **${msg}**! \n **Perfeito! Uma Deusa Suprema a sua disposição!*`)
}


exports.help = {
  nome : "Ratewaifu",
  descricao: "Caso você queira avaliar sua waifu, você pode usar esse comando! Mas lembre-se ele sempre irá dar dicas importantes para você!"
}