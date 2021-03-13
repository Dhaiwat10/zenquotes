const { default: axios } = require('axios');

const apiUrl = 'https://zenquotes.io/api/random';

module.exports.getRandomQuote = async () => {
  try {
    const response = await axios.get(apiUrl);

    const { q: quote, a: author } = response.data[0];

    const output = `> ❝ ***${quote}*** ❞ 
    - ${author}`;

    return output;
  } catch (error) {
    console.log(error);
    return null;
  }
};
