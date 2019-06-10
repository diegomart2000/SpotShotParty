import request from './request';

export default {
  /**
   * To fetch current user
   * @returns {Promise} - Result of ajax call.
   */
  fetch() {
    return request().get(`/me`);
  },
};
