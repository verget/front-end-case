const request = require('request-promise-native');

const jokesService = () => {
  const jokesUrl = 'http://api.icndb.com/jokes';
  const getRandomJokes = (count) => {
    const options = {
      uri: `${jokesUrl}/random/${count}`,
      json: true
    };
    return request(options);
  };

  return {
    getRandomJokes
  };
};

module.exports = jokesService;