require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const { initializeDatabase } = require('./models');
require('./auth/discord');
const commissionRouter = require('./routes/commissionRouter');
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/commissions', commissionRouter);
app.use('/auth', authRouter);

// Initialize Database and Start Server
initializeDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
