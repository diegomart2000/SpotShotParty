import { createSelector } from 'reselect';

const base = ( {party: { party }} ) => party;

export const partySelector = createSelector(
  base,
  ( party ) => {
    if (!party) return;

    const { name: partyName, passCode, playlistId } = party;
    return ({ partyName, passCode, playlistId });
  }
);

export const isFetchingSelector = ({ party: { isFetching } }) => isFetching;
export const errorSelector = ({ party: { error } }) => error;

export const playersSelector = createSelector(
  base,
  ( party ) => {
    if (!party) return;

    const { parties } = party;
    return parties;
  }
)
