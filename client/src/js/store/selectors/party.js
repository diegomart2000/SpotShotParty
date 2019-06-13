import { createSelector } from 'reselect';

export const partySelector = ({ party }) => party;
export const isFetchingSelector = ({ party: { isFetching } }) => isFetching;
export const errorSelector = ({ party: { error } }) => error;
