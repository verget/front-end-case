const { Note } = require('../models');
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

  const saveFavorite = async (req, res) => {
    const { id } = req.body;
    try {
      const joke = await jokesService().getSpecificJoke(id);
      if (!joke || joke.type !== 'success') {
        return res.status(400).json({msg: 'Bad Request: Jokes not found'});
      }
      await Note.create({
        joke: joke.value.joke,
        jokeId: id
      });
      return res.status(200).json();
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const removeFavorite = async (req, res) => {
    const { id } = req.query;
    try {
      await Note.destroy({ where: { jokeId: id } });
      return res.status(200).json();
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getFavorites = async(req, res) => {
    try {
      const favorites = await Note.findAll();
      return res.status(200).json({
        type: 'success',
        value: favorites.map(item => {
          return {
            id: item.jokeId,
            joke: item.joke,
            favorite: true
          }
        })
      });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    fetchRandomJokes,
    saveFavorite,
    removeFavorite,
    getFavorites
  };

};

module.exports = JokesController;
