const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /login': 'AuthController.login',
  'POST /validate': 'AuthController.validate',
  'POST /favorite': 'JokesController.saveFavorite',
  'GET /favorites': 'JokesController.getFavorites',
  'GET /jokes': 'JokesController.fetchRandomJokes'
};

module.exports = publicRoutes;
