const { default: axios } = require('axios');
const Discord = require('discord.js');

const apiUrl = 'https://zenquotes.io/api/random';

const zenLogo = new Discord.MessageAttachment('./zen.png');

module.exports.getEmbed = async (msg) => {
  try {
    const { quote, author } = await getRandomQuote();

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`❝ ${quote}❞`)
      // .setURL('https://discord.js.org/')
      .setDescription(`— ${author}`)
      .setFooter('zen quotes', 'attachment://zen.png');

    // await msg.channel.send({ files: [zenLogo], embed: embed });

    return { files: [zenLogo], embed: embed };
  } catch (e) {
    console.log(e);
    msg.channel.send('An error occured. Please try again.');
    return false;
  }
};

const getRandomQuote = async () => {
  try {
    const response = await axios.get(apiUrl);

    const { q: quote, a: author } = response.data[0];

    const output = { quote, author };

    return output;
  } catch (error) {
    console.log(error);
    return null;
  }
};
