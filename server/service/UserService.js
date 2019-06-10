const { error, log } = require('../util/logger');
const User = require('../model/User');

/**
 * To get a user by id
 * @param {string} userId
 */
module.exports.get = async (userId) => {
  if (!userId) throw new Error(`User id is required. Got u:${userId}`);

  try {
    return await User.findById(userId).exec();
  } catch (err) {
    error(`UserService : Error while loading user for ${userId}`, err);
    throw err;
  }
};

/**
 *
 */
module.exports.login = async ({ spotifyId, userName, accessToken, email }) => {
  try {
    log(`UserService : User login [u: ${spotifyId}]`);
    let user = await User.findOne({ spotifyId }).exec();

    if (!user) {
      log(`UserService : User not found, will create it [u: ${spotifyId}]`);
      user = new User({ spotifyId, userName, email, accessToken });
      await user.save();
    } else if (accessToken !== user.accessToken) {
      log(`UserService : User access token expired, will update it [u: ${spotifyId}]`);
      user.accessToken = accessToken;
      await user.save();
    }

    return user;

  } catch (err) {
    error(`UserService : Error while creating user for ${plain}`, err);
    throw err;
  }
};
