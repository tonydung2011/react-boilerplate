/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CALL_STEAM_AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
} from './constants';

export const initialState = fromJS({
  user: {
    auth: false,
    info: {},
    items: [],
    loading: false,
    loaded: false,
    error: false,
    filter: {
      sort: '',
      search: '',
    },
  },
  bot: {
    id: '1',
    items: [],
    loading: false,
    loaded: false,
    error: false,
    filter: {
      minPrice: 0,
      maxPrice: 9999,
      hero: '',
      rarity: '',
      sort: '',
      search: '',
    },
  },
  trade: {
    urlTrade: '',
    itemsOfferd: [],
    itemsReceive: [],
  },
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CALL_STEAM_AUTHENTICATE:
      return state;
    case AUTHENTICATE_SUCCESS:
      return state
        .setIn(['user', 'auth'], true)
        .setIn(['user', 'info'], action.payload.data);
    case AUTHENTICATE_FAIL:
      return state.setIn(['user', 'auth'], false);
    default:
      return state;
  }
}

export default homeReducer;
