const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const UserService = require('../service/UserService');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_CALLBACK_URL = process.env.CLIENT_CALLBACK_URL;

passport.use(
  new SpotifyStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CLIENT_CALLBACK_URL,
    },

    async (accessToken, refreshToken, expiresIn, profile, done) => {
      try {
        console.log('accessToken', accessToken, 'expiresIn', expiresIn, 'refreshToken', refreshToken);
        const { id: spotifyId, username: userName, _json: { email } } = profile;
        const user = await UserService.login({ spotifyId, userName, email, accessToken });
        done(null, user.toJSON());
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (_id, done) => {
  try {
    const user = await UserService.get(_id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
