import request from './request';

export default {
  /**
   * To post create a party
   * @returns {Promise} - Result of ajax call.
   */
  create({partyName, playlistId}) {
    return request().post(`/party`, { partyName, playlistId });
  },

  /**
   * To fetch current party for given user
   * @returns {Promise} - Result of ajax call.
   */
  fetch() {
    return request().get(`/party`);
  },
};
