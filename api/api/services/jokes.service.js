const request = require('request-promise-native');

const jokesService = () => {
  const jokesUrl = 'http://api.icndb.com/jokes';
  const getRandomJokes = (count = 10) => {
    const options = {
      uri: `${jokesUrl}/random/${count}`,
      json: true,
    };
    return request(options);
  };

  const getSpecificJoke = (id) => {
    const options = {
      uri: `${jokesUrl}/${id}`,
      json: true,
    };
    return request(options);
  };

  return {
    getRandomJokes,
    getSpecificJoke,
  };
};

module.exports = jokesService;
