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
