const {
  createNote,
  deleteNote,
} = require('./NoteMutation');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('./UserMutation');

module.exports = {
  createNote,
  deleteNote,
  createUser,
  updateUser,
  deleteUser,
};
