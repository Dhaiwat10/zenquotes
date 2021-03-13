const { default: axios } = require('axios');
const apiUrl =
  'https://api.unsplash.com/search/photos?query=aesthetic&client_id=';

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.getRandomPic = async (token) => {
  try {
    const response = await axios.get(apiUrl + token);

    const { results } = response.data;

    const idx = randomNumber(0, results.length);

    const { regular: src } = results[idx].urls;

    console.log(src);

    return src;
  } catch (e) {
    // console.log(e);
    return null;
  }
};
