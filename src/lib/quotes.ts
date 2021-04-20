import { Message, MessageAttachment, MessageEmbed } from 'discord.js';
import axios from 'axios';
import { EmbedResult, Quote } from './types';

const apiUrl = 'https://zenquotes.io/api/random';

const zenLogo = new MessageAttachment('./zen64.png');

export const getEmbed = async (
  msg?: Message
): Promise<null | EmbedResult> => {
  try {
    const { quote, author } = await getRandomQuote();

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`❝ ${quote}❞`)
      // .setURL('https://discord.js.org/')
      .setDescription(`— ${author}`)
      .setFooter('zen quotes', 'attachment://zen64.png');

    // await msg.channel.send({ files: [zenLogo], embed: embed });

    const result: EmbedResult = { files: [zenLogo], embed: embed };
    return result;
  } catch (e) {
    console.log(e);
    msg.channel.send('An error occured. Please try again.');
    return null;
  }
};

const getRandomQuote = async (): Promise<Quote | null> => {
  try {
    const response = await axios.get(apiUrl);

    const { q: quote, a: author } = response.data[0];

    const output: Quote = { quote, author };

    return output;
  } catch (error) {
    console.log(error);
    return null;
  }
};
