const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['identify', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, username, email } = profile;
      try {
        let user = await User.findOne({ discordId: id });
        if (!user) {
          user = await User.create({ discordId: id, username, email });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
