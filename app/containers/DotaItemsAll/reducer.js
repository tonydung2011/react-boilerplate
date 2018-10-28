/*
 *
 * DotaItemsAll reducer
 *
 */

import { fromJS, List } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_DOTA_ITEMS,
  GET_DOTA_ITEMS_SUCCESS,
  GET_DOTA_ITEMS_FAIL,
} from './constants';

export const initialState = fromJS({
  loaded: false,
  loading: false,
  data: [],
  error: false,
});

function dotaItemsAllReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ALL_DOTA_ITEMS:
      return state
        .set('loading', true)
        .set('loaded', false)
        .set('error', false);
    case GET_DOTA_ITEMS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('data', List(action.data));
    case GET_DOTA_ITEMS_FAIL:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('error', true);
    default:
      return state;
  }
}

export default dotaItemsAllReducer;
