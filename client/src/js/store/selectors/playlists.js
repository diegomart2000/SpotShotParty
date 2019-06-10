import { createSelector } from 'reselect';

export const playlistSelector = ({ playlist }) => playlist;
export const isFetchingSelector = ({ playlist: { isFetching } }) => isFetching;
export const errorSelector = ({ playlist: { error } }) => error;
export const playlistTrackSelector = ({ id, name, images }) => ({ id, name, thumb: images && images[0] });

export const playlistsSelector = createSelector(
  playlistSelector,
  ({ playlists }) => {
    if (!playlists) return null;
    const { items } = playlists;
    return items.map(playlistTrackSelector);
  }
)
