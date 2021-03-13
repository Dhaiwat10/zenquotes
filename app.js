const Discord = require('discord.js');
const { getRandomQuote } = require('./lib/quotes');
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bot is ready');
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (msg) => {
  if (msg.content === '!quote') {
    const quote = await getRandomQuote();

    if (!quote) {
      msg.channel.send('An error occured. Please try again.');
    } else {
      msg.channel.send(quote);
    }
  }
});
