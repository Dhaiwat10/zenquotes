const Discord = require('discord.js');
const schedule = require('node-schedule');
const { getRandomPic } = require('./lib/pic');
require('dotenv').config();

const { getRandomQuote } = require('./lib/quotes');
const { sendMessageToAllGuilds } = require('./lib/util');

const client = new Discord.Client();

const unsplashToken = process.env.UNSPLASH_ACCESS_KEY;

client.on('ready', async () => {
  console.log('Bot is ready');

  const morningRule = new schedule.RecurrenceRule();
  morningRule.hour = 06;
  morningRule.minute = 0;
  morningRule.tz = 'Asia/Kolkata';

  const nightRule = new schedule.RecurrenceRule();
  nightRule.hour = 23;
  nightRule.minute = 39;
  nightRule.tz = 'Asia/Kolkata';

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
