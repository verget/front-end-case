const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { NoteType } = require('../types');
const { Note } = require('../../models');

const noteQuery = {
  type: new GraphQLList(NoteType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    jokeId: {
      name: 'jokeId',
      type: GraphQLInt,
    },
    joke: {
      name: 'joke',
      type: GraphQLString,
    }
  },
  resolve: (user, args) => Note.findAll({ where: args }),
};

module.exports = { noteQuery };
