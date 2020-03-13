exports.run = async (bot, message, args) => { // eslint-disable-line no-unused-vars
	
	const Discord = require('discord.js');
    const fs = require('fs');
    const config = require('../../config.json');
    
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: config.prefix
      };
    }

    if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("Você não tem permissão de `ADMINISTRATOR` ");

    

  let prefix = prefixes[message.guild.id].prefixes; 
  let member = args[0];

  const menu0 = new Discord.RichEmbed()  

  .setTitle('🚥 Menu')
  .setDescription(`Menu de ajuda do comando: **${message.content}**`)
  .addField('Comando:', `\`${message.content}\``)
  .addField('Tutorial:', `\`${prefix}Unban <@ID> <Motivo>\``)
  .addField('Alternativas:' , '\`Não informado.\`')
  .setColor('#6800e5')
  .setTimestamp()
  .setFooter(`${bot.user.username}`)

    if(isNaN(member))  return message.reply(menu0).then(async msg => {

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

	const reason = args.splice(1, args.length).join(' ') || `Não informado.`;

	message.guild.unban(member).then(() => {

        const embed = new Discord.RichEmbed()
        let icon = message.guild.iconURL

        embed.setColor('RED')
        embed.setThumbnail(icon)
        embed.setTimestamp()
        embed.setTitle(`<a:redealert:637058611948027923> | ${member} foi despunido.`)
        embed.addField(`Usuário:`, `${member}`)
        embed.addField(`Autor:`, `${message.author.username}`)
        embed.addField(`Motivo:`, `${reason}`)
        embed.setFooter(`${bot.user.username}`);
		   message.channel.send(embed)
	})
		.catch(error => message.reply('Esse jogador não está banido.'));
};

exports.help = {
  nome : "Unban",
  descricao: "Com esse comando você pode desbanir usuários que estavam banidos... Apenas use caso ache que ele foi punido injustamente.",
  aliases: "unban"
}