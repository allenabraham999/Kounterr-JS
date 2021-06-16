const TelegramBot = require("node-telegram-bot-api");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const token = "1882108290:AAFf13UhDmLO1cqx6O4Xp2sioyzHYUzjoUg";
const bot = new TelegramBot(token, { polling: true });

//main object containing the word and the count of people using it.
let kount = {};

bot.on("polling_error", (err) => console.log(err));

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const chat = msg.text;
  console.log("Message details");
  console.log(msg);
  let nm = msg.from.first_name;
  console.log("The name is:");
  console.log(msg.chat);
  console.log(nm);
  const c = chat.split(" ");
  //check for the word in every message.
  c.forEach((x) => {
    if (Object.keys(kount).includes(x)) {
      if (!Object.keys(kount[x]).includes(nm)) {
        kount[x][nm] = 1;
      } else {
        kount[x][nm] += 1;
      }
    }
  });
});

bot.onText(/\add (.+)/, (msg, match) => {
  if (Object.keys(kount).includes(match[1])) {
    console.log("Its already there!");
  } else {
    kount[match[1]] = {};
  }
});

getString = (k) => {
  let text = "Word Count" + "\n \n";
  for (const i in k) {
    text += i + "  " + k[i] + "\n";
  }
  return text;
};

bot.onText(/\/stats (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  if (Object.keys(kount).includes(match[1])) {
    const toSend = getString(kount[match[1]]);
    bot.sendMessage(chatId, toSend);
  } else {
    console.log("Didn't get the word!");
    bot.sendMessage(chatId, "Didnt get the word");
  }
});
