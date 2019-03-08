const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /login': 'AuthController.login',
  'POST /validate': 'AuthController.validate',
  'GET /jokes': 'JokesController.fetchRandomJokes'
};

module.exports = publicRoutes;
