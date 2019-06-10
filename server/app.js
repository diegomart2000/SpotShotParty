require('dotenv').config();
require('./util/mongoose');

const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const helmet = require('helmet');

const loginRequired = require('./middleware/LoginRequired');

const routes = require('./routes');

const passport = require('./util/passport');
const { log, error } = require('./util/logger');

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.set('view engine', 'pug');
app.use(helmet());
app.use(session({
  store: new RedisStore({
    url: process.env.REDIS_URL,
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
  error(err.stack);
  res.status(500).redirect('/500');
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_BASE_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(loginRequired);

routes(app);

app.listen(PORT, HOST, () => {
  log(`Spot Shot Party is running: 🌎${HOST}:${PORT} - ${ENV} mode `);
});
