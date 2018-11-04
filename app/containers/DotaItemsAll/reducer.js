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
  UPDATE_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS_SUCCESS,
  UPDATE_DOTA_ITEMS_FAIL,
} from './constants';

export const initialState = fromJS({
  loaded: false,
  loading: false,
  data: [],
  error: false,
  updateError: false,
  updating: false,
  updated: false,
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
    case UPDATE_DOTA_ITEMS:
      return state
        .set('updating', true)
        .set('updated', false)
        .set('updateError', false);
    case UPDATE_DOTA_ITEMS_SUCCESS:
      return state
        .set('updating', false)
        .set('updated', true)
        .set('updateError', false);
    case UPDATE_DOTA_ITEMS_FAIL:
      return state
        .set('updating', false)
        .set('updated', true)
        .set('updateError', true);
    default:
      return state;
  }
}

export default dotaItemsAllReducer;
