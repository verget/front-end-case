const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'notes';

const Note = sequelize.define('Note', {
  jokeId: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  joke: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = { Note };
