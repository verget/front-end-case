const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const { NoteType } = require('../types');
const { Note } = require('../../models');

const createNote = {
  type: NoteType,
  description: 'The mutation that allows you to create a new Note',
  args: {
    userId: {
      name: 'userId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    jokeId: {
      name: 'jokeId',
      type: new GraphQLNonNull(GraphQLInt),
    },
    joke: {
      name: 'joke',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (value, { userId, jokeId, note }) => (
    Note.create({
      userId,
      jokeId,
      note,
    })
  ),
};

const deleteNote = {
  type: NoteType,
  description: 'The mutation that allows you to delete a existing Note by jokeId',
  args: {
    jokeId: {
      name: 'jokeId',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (value, { jokeId }) => {
    const foundNote = await Note.find({jokeId});

    if (!foundNote) {
      throw new Error(`Note with jokeId: ${id} not found!`);
    }

    await Note.destroy({
      where: {
        jokeId,
      },
    });

    return foundNote;
  },
};

module.exports = {
  createNote,
  deleteNote,
};
