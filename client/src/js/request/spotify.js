const SpotifyClient = require('spotify-web-api-node');
const spotify = new SpotifyClient({});

// Just to abstract the client and make the API calls simpler
export default {
  setAccessToken: spotify.setAccessToken.bind(spotify),

  getPartyPlaylists() {
    return spotify.getPlaylistsForCategory('party', {country: 'US'});
  }
};
