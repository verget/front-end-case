const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /login': 'AuthController.login',
  'POST /validate': 'AuthController.validate',
  'POST /jokes/favorite': 'JokesController.saveFavorite',
  'GET /jokes': 'JokesController.fetchRandomJokes'
};

module.exports = publicRoutes;
