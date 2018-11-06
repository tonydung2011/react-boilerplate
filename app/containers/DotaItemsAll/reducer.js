/*
 *
 * DotaItemsAll reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_DOTA_ITEMS,
  GET_DOTA_ITEMS_SUCCESS,
  GET_DOTA_ITEMS_FAIL,
  UPDATE_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS_SUCCESS,
  UPDATE_DOTA_ITEMS_FAIL,
  UPDATE_PAGE,
  UPDATE_LIMIT,
} from './constants';

export const initialState = fromJS({
  loaded: false,
  loading: false,
  data: [],
  error: false,
  updateError: false,
  updating: false,
  updated: false,
  page: 1,
  limit: 10,
  total: 0,
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
        .set('data', fromJS(action.data.data))
        .set('page', fromJS(action.data.page))
        .set('limit', fromJS(action.data.limit))
        .set('total', action.data.total);
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
    case UPDATE_PAGE:
      return state.set('page', action.page);
    case UPDATE_LIMIT:
      return state.set('limit', action.limit);
    default:
      return state;
  }
}

export default dotaItemsAllReducer;
