const { log } = require('../util/logger');

module.exports = (req, res, next) => {
  const [ blank, start ] = req.url.split('/');

  if ( start === 'api' ) {
    const { user } = req;
    if (!user) {
      log(`UserLogin : path ${start} not authorized`);

      res.status(401).send({ code: 401, message: 'User login is required' });
      return;
    }
  }

  next();
}
