const telegram = require('node-telegram-bot-api')
const axios = require('axios')
//Your Telegram API token
const token = ""

const options = {polling: true}

const bot = new telegram(token, options)

bot.on("message", (msg) => {
    const text = msg.text;    
    var config = {
        method: 'GET',
        url: 'https://mashape-community-urban-dictionary.p.rapidapi.com/define',
        params: {term: text},
        headers: {
            'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
            'x-rapidapi-key': '4be1c38649msheaef2a1e57e163fp11d935jsn5b41f4448ef4'
        }
    }; 
    axios.request(config)
        .then((res) => {            
            let definition = res.data.list[0].definition
            if(definition.length < 4090) {                
                bot.sendMessage(msg.chat.id, text + ": " + definition)
            } else {
                bot.sendMessage(msg.chat.id, "text too long")
            }                               
        }).catch(() =>  {                 
            bot.sendPhoto(                
                msg.chat.id,                                
                'https://i.kym-cdn.com/entries/icons/original/000/032/606/cover2.jpg'
            )
        })
})
