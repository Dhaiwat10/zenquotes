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

  client.user.setPresence({
    activity: { name: '!quote', type: 'LISTENING' },
    status: 'online',
  });

  const morningRule = new schedule.RecurrenceRule();
  morningRule.hour = 06;
  morningRule.minute = 0;
  morningRule.tz = 'Asia/Kolkata';

  const nightRule = new schedule.RecurrenceRule();
  nightRule.hour = 23;
  nightRule.minute = 60 * Math.random();
  nightRule.tz = 'Asia/Kolkata';

  schedule.scheduleJob(morningRule, async function () {
    try {
      const quote = await getRandomQuote();
      const gm = ':sunrise_over_mountains:';

      sendMessageToAllGuilds(client, gm);
      sendMessageToAllGuilds(client, quote);
    } catch (err) {
      console.log('Could not send message to a (few) guild(s)!');
    }
  });

  schedule.scheduleJob(nightRule, async function () {
    try {
      const quote = await getRandomQuote();
      const gn = ':night_with_stars:';

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

client.on('guildCreate', (guild) => {
  let channelID;
  let channels = guild.channels.cache;

  for (let key in channels) {
    let c = channels[key];
    if (c[1].type === 'text') {
      channelID = c[0];
      break;
    }
  }

  let channel = guild.channels.cache.get(guild.systemChannelID || channelID);

  channel.send('Thanks for inviting me onto your server!');
  channel.send('You can type **!quote** to get a random quote.');
  channel.send('Carpe diem! :sparkles:');
});
