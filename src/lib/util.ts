import Discord, { Client, MessageAttachment } from 'discord.js';
import { EmbedResult } from './types';

const zenLogo = new MessageAttachment('./zen64.png');

export const sendMessageToAllGuilds = (
  client: Client,
  message: string | EmbedResult
) => {
  client.guilds.cache.map((guild) => {
    let found = 0;
    guild.channels.cache.map((c: any) => {
      if (found === 0) {
        if (c.type === 'text') {
          if (c.permissionsFor(client.user).has('VIEW_CHANNEL') === true) {
            if (c.permissionsFor(client.user).has('SEND_MESSAGES') === true) {
              c.send(message);
              found = 1;
            }
          }
        }
      }
    });
  });
};

export const getWelcomeMessage = async () => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Thanks for inviting me to your server!')
    // .setURL('https://discord.js.org/')
    .setDescription(
      'You can type **!quote** to get a random quote. Carpe diem! :sparkles:'
    )
    .setFooter('zen quotes', 'attachment://zen64.png');

  return { files: [zenLogo], embed: embed };
};
