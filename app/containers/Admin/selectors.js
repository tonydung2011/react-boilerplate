import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dotaItemsAll state domain
 */

const selectDotaItemsAllDomain = state => state.get('Admin', initialState);

/**
 * Other specific selectors
 */

const selectDotaItemsError = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('error'));
const selectDotaItemsLoading = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('loading'));
const selectDotaItemsLoaded = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('loaded'));
const selectDotaItemsData = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('data').toJS());
const selectDotaItemsPage = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('page'));
const selectDotaItemsLimit = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('limit'));
const selectDotaItemsTotal = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('total'));
const selectAuthenticated = () =>
  createSelector(selectDotaItemsAllDomain, state => state.get('authenticated'));
const selectPopupStatus = () =>
  createSelector(selectDotaItemsAllDomain, state =>
    state.get('isUpdatePopupOpen'),
  );

/**
 * Default selector used by DotaItemsAll
 */

const makeSelectDotaItemsAll = () =>
  createSelector(selectDotaItemsAllDomain, substate => substate.toJS());

export default makeSelectDotaItemsAll;
export {
  selectDotaItemsAllDomain,
  selectDotaItemsData,
  selectDotaItemsError,
  selectDotaItemsLoaded,
  selectDotaItemsLoading,
  selectDotaItemsPage,
  selectDotaItemsLimit,
  selectDotaItemsTotal,
  selectAuthenticated,
  selectPopupStatus,
};
