const TelegramBot = require("node-telegram-bot-api");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const token = "1882108290:AAFf13UhDmLO1cqx6O4Xp2sioyzHYUzjoUg";
const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (err) => console.log(err));
let count = 0;
bot.on("message",(msg)=>{
    console.log(msg);
    console.log(msg.chat.id);
    console.log(msg.chat.name);
    const chatId = msg.chat.id;
    const chat = msg.text;
    const dog = "http://pngimg.com/uploads/dog/dog_PNG50409.png";
    if(chat === "nigga"){
        console.log("NAlert");
        count+=1;
        bot.sendMessage(chatId,"ncount"+count);
    }
});
