const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

exports.run = async(bot, message, args, dados) => {

  if(!message.member.hasPermission('ADMINISTRATOR')) 
  return message.channel.send('> Você não tem permissão para isso amigo. Apenas `ADMINISTRADORES`')

    let todos = '@everyone'

  message.channel.send(todos).then( message => {

    let register = new Discord.RichEmbed()

    .setTitle('Registra-se')
    .setColor('#6800e5')
    .setDescription(`Olá seja bem vindo ao **${message.guild.name}**. \n\n :white_small_square: Leia nossas regras para ficar ligado nas diretrizes e não ser punido.\n :white_small_square: Clique no emoji <:130:669324220412723229> para registrar-se ao servidor.`)
    .setFooter(message.guild.name)
     
    message.channel.send(register).then(message => {
    message.react('669324220412723229')

     })
    })
   
}