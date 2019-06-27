import request from './request';

export default {
  /**
   * To post create a party
   * @returns {Promise} - Result of ajax call.
   */
  create({partyName, playlistId}) {
    partyName = partyName.trim();
    return request().post(`/party`, { partyName, playlistId });
  },

  /**
   * To fetch current party for given user
   * @returns {Promise} - Result of ajax call.
   */
  fetch() {
    return request().get(`/party`);
  },

  /**
   * To join a party
   * @returns {Promise} - Result of ajax call.
   */
  join({ nickName, avatar, partyName, passCode }) {
    partyName = partyName.trim();
    nickName = nickName.trim();
    return request().post(`/party/join`, { nickName, avatar, partyName, passCode });
  },
};
