
const jokesService = require('../services/jokes.service');

const JokesController = () => {

  const fetchRandomJokes = async (req, res) => {
    const { count } = req.query;
    try {
      const jokes = await jokesService().getRandomJokes(count);
      if (!jokes) {
        return res.status(400).json({msg: 'Bad Request: Jokes not found'});
      }
      return res.status(200).json(jokes);
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    fetchRandomJokes
  };
};

module.exports = JokesController;
