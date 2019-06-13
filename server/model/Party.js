const mongoose = require('../util/mongoose');
const { ObjectId } = mongoose.Schema.Types;

const partiesSchema = new mongoose.Schema({
  nickName: 'string',
});

const schema = new mongoose.Schema({
  userId: ObjectId,
  name: 'string',
  passCode: 'string',
  playlistId: 'string',

  parties: [partiesSchema],
});

const Party = mongoose.model('Party', schema);
module.exports = Party;
