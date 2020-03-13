const Discord = require('discord.js')
const anuncio = require('../../anuncio.json')

exports.run = async(bot, message, args) => {

        let convites = Math.floor((Math.random() * 20) + 0);

              if (convites == 14) {
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 9){
               message.reply(`${anuncio.anuncio}`)
             } else if (convites == 4){
               message.reply(`${anuncio.anuncio}`)
             } 

        const helpPanel = new Discord.RichEmbed();

        let Avatar = message.guild.iconURL;

        helpPanel.setThumbnail(Avatar)
        helpPanel.setAuthor(message.member.displayName, message.member.user.avatarURL);
        helpPanel.setTitle("Adquirir Passe premium.")
        helpPanel.setDescription("\nOlá, me ajude a ficar online, pois não consigo pagar minha host sozinha. ❤ \n🙅 Não precisa ser um **grande** valor, pode até ser R$: 1,00 ou até menos. 😊\n\nAjude: `Link removido.`")  
        helpPanel.setFooter(`${bot.user.username}`, bot.user.displayAvatarURL);
        helpPanel.setColor("#6800e5");
        helpPanel.setTimestamp();
        message.channel.send(helpPanel);

}
exports.help = {
    nome : "Donate",
    descricao: "Esse comando serve para quem quiser fazer algum tipo de doação, nesse caso seria dinheiro. Caso você queira ajudar a KeelTa à ficar online, você pode doar até R$: 1.00 Real pelo menos. :)"
  }