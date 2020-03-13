const Discord = require('discord.js')
const fs = require('fs');
const config = require('../../config.json');
const {configg, diversao, minicraft, moderacao, tankionline, utilitarios} = require('../../legendas')

exports.run = (bot, msg, args) => {

    if (!args[0]) {
        let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
        if(!prefixes[msg.guild.id]){
         prefixes[msg.guild.id] = {
         prefixes: config.prefix
  };
}
        let embed = new Discord.RichEmbed()

        let prefix = prefixes[msg.guild.id].prefixes;
         
        embed.setAuthor(bot.user.username, bot.user.avatarURL)
        embed.setTitle('Menu de Help.')
        embed.setDescription(`Olá, sou **${bot.user.username}** estou feliz para poder participar do seu servidor! Me adicione [aqui](https://is.gd/KeeltaBot) ficarei muito grata! ❤️\n\n<:aviso:686628220333981700> Temos no total de \`${bot.commands.size}\` comandos para você explorar!`)
        embed.addField(`Como usar.`, `\` ${prefix}help <nomeComando>\`\n\nCategorias:**\n▫️ ${prefix}info \`diversão\`\n▫️ ${prefix}info \`moderação\`\n▫️ ${prefix}info \`config\`\n▫️ ${prefix}info \`tankionline\`\n▫️ ${prefix}info \`minecraft\`\n▫️ ${prefix}info \`nsfw\`\n▫️ ${prefix}info \`utilitarios\`**\n `)
        embed.addField(`Você gosta das minhas funções?`, `Clique [aqui](https://is.gd/KeeltaBot) para me adicionar no seu servidor.`)
        embed.setColor(`#6800e5`)
        embed.setFooter(`Versão atual: 10.0.3`)
        
       msg.channel.send(embed)
  
    } else {

    let command = args[0];
    
    if(bot.commands.has(command)) {

      command = bot.commands.get(command);

      let naoDefinido = 'Esse comando ainda não tem uma descrição definida.'; // Descrição do comando.
      let simDefinido = command.help.descricao;

      let nomeNaoDefinido = 'Não definido.'; // Nome do comando.
      let nomeSimDefinido = command.help.nome;

      let nome = command.help.nome ? nomeSimDefinido : nomeNaoDefinido // Nome do comando
      let descricao = command.help.descricao ? simDefinido : naoDefinido // Descrição do comando.

      let embed1 = new Discord.RichEmbed() 
  
      embed1.setTitle(`Comando: ${nome}`)
      embed1.setColor(`#6800e5`)
      embed1.setFooter(`${bot.user.username}`, `${bot.user.avatarURL}`)
      embed1.addField(`Descrição:`, `${descricao}`)
      embed1.setTimestamp()

      msg.channel.send(embed1)
     
      
}else {
  let dados = '> Não conseguir achar esse comando no meu banco de dados... 😩'; // caso não ache o comando.
  msg.channel.send(dados)
}
 }
  }


exports.help = {
  nome : "Help",
  descricao: "Esse comando server para poder visualizar outros comandos."
}