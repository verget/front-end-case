const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const NoteType = new GraphQLObjectType({
  name: 'Note',
  description: 'This represents a Note',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (note) => note.id,
    },
    jokeId: {
      type: GraphQLInt,
      resolve: (note) => note.jokeId,
    },
    userId: {
      type: GraphQLInt,
      resolve: (note) => note.userId,
    },
    joke: {
      type: GraphQLString,
      resolve: (note) => note.joke,
    }
  }),
});

module.exports = { NoteType };
