import { createSelector } from 'reselect';

const base = ({ player }) => player;

export const playerSelector = createSelector(
  base,
  ({ player }) => {
    if (!player) return;

    const { name: partyName, passCode, playlistId } = player;
    return ({ partyName, passCode, playlistId });
  }
);

export const isFetchingSelector = createSelector(
  base,
  player => player.isFetching
);

export const errorSelector =createSelector(
  base,
  ({ error }) => error,
);
