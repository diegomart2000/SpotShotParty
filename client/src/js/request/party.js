import request from './request';

export default {
  /**
   * To fetch current user
   * @returns {Promise} - Result of ajax call.
   */
  create({partyName, playlistId}) {
    return request().post(`/party`, { partyName, playlistId });
  },
};
