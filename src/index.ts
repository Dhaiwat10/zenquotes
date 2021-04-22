import Discord, { Client, Message } from 'discord.js';
import schedule from 'node-schedule';
require('dotenv').config();

import { getEmbed } from './lib/quotes';
import { sendMessageToAllGuilds, getWelcomeMessage } from './lib/util';

const client: Client = new Discord.Client();

client.on('ready', async () => {
  console.log('Bot is ready');

  client.user.setPresence({
    activity: { name: '!quote', type: 'LISTENING' },
    status: 'online',
  });

  const morningRule = new schedule.RecurrenceRule();
  morningRule.hour = 6;
  morningRule.minute = 0;
  morningRule.tz = 'Asia/Kolkata';

  const nightRule = new schedule.RecurrenceRule();
  nightRule.hour = 23;
  nightRule.minute = 0;
  nightRule.tz = 'Asia/Kolkata';

  schedule.scheduleJob(morningRule, async function () {
    try {
      const embed = await getEmbed();
      sendMessageToAllGuilds(client, embed);
    } catch (err) {
      console.log('Could not send message to a (few) guild(s)!');
    }
  });

  schedule.scheduleJob(nightRule, async function () {
    try {
      const embed = await getEmbed();
      sendMessageToAllGuilds(client, embed);
    } catch (err) {
      console.log('Could not send message to a (few) guild(s)!');
    }
  });
});

client.login(process.env.BOT_TOKEN);

client.on('message', async (msg: Message) => {
  console.log('Message');

  if (msg.content === '!quote') {
    try {
      const embed = await getEmbed(msg);

      await msg.channel.send(embed);
    } catch (e) {
      console.log(e);

      await msg.channel.send('An error occured. Please try again.');
    }
  }
});

client.on('guildCreate', async (guild: any) => {
  let channelID;
  const channels = guild.channels.cache;

  for (const key in channels) {
    const c = channels[key];
    if (c[1].type === 'text') {
      channelID = c[0];
      break;
    }
  }

  const channel = guild.channels.cache.get(guild.systemChannelID || channelID);

  const embed = await getWelcomeMessage();

  await channel.send(embed);
});
