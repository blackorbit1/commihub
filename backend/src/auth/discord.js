const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { User } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
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
      const { id, username, email, avatar } = profile;
      try {
        let user = await User.findOne({ where: { discordId: id } });
        if (!user) {
          user = await User.create({ discordId: id, username, email, avatar });
        } else {
          user.username = username;
          user.email = email;
          user.avatar = avatar;
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
