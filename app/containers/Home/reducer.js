/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  GET_BOT_ITEMS_SUCCESS,
  GET_BOT_ITEMS_FAIL,
  GET_BOT_ITEMS,
  CALL_STEAM_AUTHENTICATE,
  GET_PROFILE_SUCCESS,
  LOGOUT_STEAM,
} from './constants';

const botList = JSON.parse(process.env.BOT_LIST);

export const initialState = fromJS({
  user: {
    auth: false,
    items: [],
    loading: false,
    loaded: false,
    error: false,
    info: {},
  },
  bot: {
    id: botList[0],
    name: '1',
    items: [],
    loading: false,
    loaded: false,
    error: false,
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
      return state
        .setIn(['user', 'loading'], true)
        .setIn(['user', 'loaded'], false);
    case AUTHENTICATE_SUCCESS:
      return state
        .setIn(['user', 'auth'], true)
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'loaded'], true)
        .setIn(['user', 'error'], false)
        .setIn(['user', 'items'], fromJS(action.data));
    case GET_PROFILE_SUCCESS:
      return state
        .setIn(['user', 'auth'], true)
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'loaded'], true)
        .setIn(['user', 'error'], false)
        .setIn(['user', 'info'], fromJS(action.data));
    case AUTHENTICATE_FAIL:
      return state
        .setIn(['user', 'auth'], false)
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'loaded'], true)
        .setIn(['user', 'error'], true);
    case GET_BOT_ITEMS:
      return state
        .setIn(['bot', 'loading'], true)
        .setIn(['bot', 'loaded'], false);
    case GET_BOT_ITEMS_SUCCESS:
      return state
        .setIn(['bot', 'loading'], false)
        .setIn(['bot', 'loaded'], true)
        .setIn(['bot', 'items'], fromJS(action.data))
        .setIn(['bot', 'error'], false);
    case GET_BOT_ITEMS_FAIL:
      return state
        .setIn(['bot', 'loading'], false)
        .setIn(['bot', 'loaded'], true)
        .setIn(['bot', 'error'], true);
    case LOGOUT_STEAM:
      return state
        .setIn(['user', 'auth'], false)
        .setIn(['user', 'info'], fromJS({}))
        .setIn(['user', 'items'], fromJS([]));
    default:
      return state;
  }
}

export default homeReducer;
