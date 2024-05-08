require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const { typeDefs, resolvers } = require('./graphql/schema');
require('./auth/discord');

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// GraphQL Setup
const server = new ApolloServer({ typeDefs, resolvers });
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}
startServer();

// Authentication Routes
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
  const token = jwt.sign({ user: req.user }, process.env.JWT_SECRET);
  res.redirect(`http://localhost:3000/login?token=${token}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
