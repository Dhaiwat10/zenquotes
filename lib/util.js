const Discord = require('discord.js');

const zenLogo = new Discord.MessageAttachment('./zen.png');

module.exports.sendMessageToAllGuilds = (client, message) => {
  client.guilds.cache.map((guild) => {
    let found = 0;
    guild.channels.cache.map((c) => {
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

module.exports.getWelcomeMessage = async () => {
  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Thanks for inviting me to your server!')
    // .setURL('https://discord.js.org/')
    .setDescription('You can type **!quote** to get a random quote. Carpe diem! :sparkles:')
    .setFooter('zen quotes', 'attachment://zen.png');

  return { files: [zenLogo], embed: embed };
};
