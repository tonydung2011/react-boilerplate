import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectHomeDomain = state => state.get('home', initialState);

/**
 * Other specific selectors
 */

const selectBot = () =>
  createSelector(selectHomeDomain, state => state.get('bot').toJS());
const selectUser = () =>
  createSelector(selectHomeDomain, state => state.get('user').toJS());
const selectTrade = () =>
  createSelector(selectHomeDomain, state => state.get('trade').toJS());

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(selectHomeDomain, substate => substate.toJS());

export default makeSelectHome;
export { selectHomeDomain, selectBot, selectUser, selectTrade };
