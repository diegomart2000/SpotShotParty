const { log } = require('../util/logger');
const passport = require('../util/passport');
// const CompanyService = require('../service/CompanyService');

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

const Passport = app => {
  app.get('/auth', get);

  app.get(
    '/auth/spotify',
    passport.authenticate(
      'spotify',
      {
        scope: [
          'streaming',
          'user-read-birthdate',
          'user-read-email',
          'user-read-private',
          'user-read-playback-state',
          'user-modify-playback-state',
        ],
        showDialog: true
      }
    ),
    auth,
  );

  app.get(
    '/auth/spotify/callback',
    passport.authenticate(
      'spotify',
      {
        failureRedirect: `${CLIENT_BASE_URL}/login`
      }
    ),
    callback,
  );

  app.get(
    '/logout',
    logout
  )
  return app;
};

const get = (req, res) => {
  log('Passport API : GET Authenticate');
  res.redirect('/auth/spotify');
};

const auth = (req, res) => {
  // The request will be redirected to spotify for authentication, so this
  // function will not be called.
};

const callback = (req, res) => {
  log('Passport API : GET Callback');
  res.redirect(`${CLIENT_BASE_URL}/party/create`);
};

const logout = (req, res) => {
  const { user } = req;
  log(`Passport API : Logout ${user && user._id}`);
  req.logout();
  res.redirect(`${CLIENT_BASE_URL}/`);
};

module.exports = Passport;
