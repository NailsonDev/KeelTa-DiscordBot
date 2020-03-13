let Discord = require('discord.js')
let fs = require('fs')

exports.run = async (bot, message, args) => {
     
 console.log(`> O usuário ${message.author.tag} usou o comando: ${message.content}`)

      
        if(message.author.id == '638557582859960330') { 

        message.channel.send('> Gerando uma key aguarde. <a:299_Loading:654448902900154368>')
        .then(message => {
             message.delete(3000)   
        })

        let a = (Math.ceil(Math.random() * 99) + '')
        let b = (Math.ceil(Math.random() * 9) + '')
        let c = (Math.ceil(Math.random() * 99) + '')
        let d = (Math.ceil(Math.random() * 99) + '')
        let e = (Math.ceil(Math.random() * 99) + '')

        setTimeout(() => {
                message.channel.send('**Uma key foi gerada**: ' +'**K**'+ a + '-' + b + '**EE**'+'-' + c +'**L**'+ '-'  + d +'**T**'+'-' + e + '**A**' )
                message.channel.send(`> Clique aqui para "descriptografar". ||${a}${b}${c}${d}${e}||`)

                console.log(a,b,c,d,e)
             }, 3020);

        }else {
                message.channel.send('> **Você não tem permissão pra gerar uma key premium**.')

                let gerarkey = message.guild.channels.find(`id`, "675115197509402647");
                if(!gerarkey) return;

                message.delete().catch(O_o=>{});
                gerarkey.send(`> O usuário \`${message.author.tag}\` tentou usar um comando não permitido:\`${message.content}\`\n> Cujo id é: \`${message.author.id}\` `);

        }      
} 

exports.help = {
  nome : "Gerarkey",
  descricao: "Esse comando é exclusivo apenas para os CEOs do BOT."
}