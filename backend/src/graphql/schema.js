const { gql } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Commission = require('../models/Commission');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String
  }

  type Commission {
    id: ID!
    title: String!
    description: String!
    progress: Int!
  }

  type Query {
    users: [User!]!
    commissions: [Commission!]!
    commission(id: ID!): Commission
  }

  type Mutation {
    addCommission(title: String!, description: String!): Commission!
    updateCommission(id: ID!, progress: Int!): Commission!
    deleteCommission(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    users: async () => await User.find(),
    commissions: async () => await Commission.find(),
    commission: async (_, { id }) => await Commission.findById(id),
  },
  Mutation: {
    addCommission: async (_, { title, description }) => {
      const commission = new Commission({ title, description, progress: 0 });
      await commission.save();
      return commission;
    },
    updateCommission: async (_, { id, progress }) => {
      const commission = await Commission.findById(id);
      commission.progress = progress;
      await commission.save();
      return commission;
    },
    deleteCommission: async (_, { id }) => {
      await Commission.findByIdAndDelete(id);
      return true;
    },
  },
};

module.exports = { typeDefs, resolvers };
