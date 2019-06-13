const { log } = require('../util/logger');

module.exports = (req, res, next) => {
  const [ blank, start, pub ] = req.url.split('/');

  // Make all paths user required, except from the ones that are pub
  if (start === 'api' && pub !== 'pub') {
    const { user } = req;
    if (!user) {
      log(`UserLogin : path ${start} not authorized`);

      res.status(401).send({ code: 401, message: 'User login is required' });
      return;
    }
  }

  next();
}
