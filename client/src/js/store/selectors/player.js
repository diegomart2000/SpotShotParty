import { createSelector } from 'reselect';

const base = ({ player }) => player;

export const playerSelector = createSelector(
  base,
  ({ player }) => {
    if (!player) return;

    const { _id, nickName, avatar } = player;
    return ({ _id, nickName, avatar });
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
