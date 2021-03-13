const Discord = require('discord.js');
const schedule = require('node-schedule');
require('dotenv').config();

const { getRandomQuote } = require('./lib/quotes');
const { sendMessageToAllGuilds } = require('./lib/util');

const client = new Discord.Client();

client.on('ready', async () => {
  console.log('Bot is ready');

  const morningRule = new schedule.RecurrencemorningRule();
  morningRule.hour = 06;
  morningRule.tz = 'Asia/Kolkata';

  const nightRule = new schedule.RecurrencemorningRule();
  morningRule.hour = 23;
  morningRule.tz = 'Asia/Kolkata';

  schedule.scheduleJob(morningRule, async function () {
    try {
      const quote = await getRandomQuote();
      const gm = ':sunrise_over_mountains:  **Good Morning!**';

      sendMessageToAllGuilds(client, gm);
      sendMessageToAllGuilds(client, quote);
    } catch (err) {
      console.log('Could not send message to a (few) guild(s)!');
    }
  });
  
  schedule.scheduleJob(nightRule, async function () {
    try {
      const quote = await getRandomQuote();
      const gn = ':night_with_stars:  **Sweet Dreams**';

      sendMessageToAllGuilds(client, quote);
      sendMessageToAllGuilds(client, gn);
    } catch (err) {
      console.log('Could not send message to a (few) guild(s)!');
    }
  });
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
