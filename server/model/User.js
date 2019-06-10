const mongoose = require('../util/mongoose');

const schema = new mongoose.Schema({
  spotifyId: 'string',
  email: 'string',
  userName: 'string',
  accessToken: 'string',
});

const User = mongoose.model('User', schema);
module.exports = User;
