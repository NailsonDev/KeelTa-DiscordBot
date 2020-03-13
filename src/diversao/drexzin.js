const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

exports.run = async(bot, message, args) => {

   if(message.author.id == '654491687128662027') { 
 
    let drexgay = 'https://i.imgur.com/lS2Wuov.png'
    let drexrebolando = 'https://imgur.com/DFHofpM.gif'

    let convites = Math.floor((Math.random() * 20) + 0);

    if (convites == 14) {
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 9){
     message.reply(`${anuncio.anuncio}`)
   } else if (convites == 4){
     message.reply(`${anuncio.anuncio}`)
   } 

    let embed = new Discord.RichEmbed()

    .setTitle('Olá sou o SirDrexD')
    .setDescription('Eu sou famosa garai!')
    .setImage(drexgay)
    .setThumbnail(drexrebolando)
    .setColor('#6800e5')
    .setFooter('Gosto de comer BOI HAHA!')
    message.channel.send(embed)
    .then(message => {
        message.react('👀')
    })
   } else  {
       message.channel.send('> Você não pode fazer isso.')
   }
}