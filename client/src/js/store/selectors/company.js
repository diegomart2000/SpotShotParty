import { createSelector } from 'reselect';

export const companySelector = ({ company: { company } }) => company;
export const isFetchingSelector = ({ company: { isFetching } }) => isFetching;
export const errorSelector = ({ company: { error } }) => error;
