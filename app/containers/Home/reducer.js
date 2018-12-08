/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import {
  DEFAULT_ACTION,
  GET_INVENTORY_SUCCESS,
  GET_INVENTORY_FAIL,
  GET_BOT_ITEMS_SUCCESS,
  GET_BOT_ITEMS_FAIL,
  GET_BOT_ITEMS,
  CALL_STEAM_AUTHENTICATE,
  GET_PROFILE_SUCCESS,
  LOGOUT_STEAM,
  REMOVE_PLAYER_ITEM,
  REMOVE_BOT_ITEM,
  SELECT_PLAYER_ITEM,
  SELECT_BOT_ITEM,
  GET_PROFILE_FAIL,
} from './constants';

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
    id: 0,
    name: '1',
    items: [],
    loading: false,
    loaded: false,
    error: false,
  },
  trade: {
    urlTrade: '',
    itemsOffer: [],
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
        .setIn(['user', 'auth'], false)
        .setIn(['user', 'loaded'], false);
    case GET_INVENTORY_SUCCESS:
      return state
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'loaded'], true)
        .setIn(['user', 'error'], false)
        .setIn(['user', 'items'], fromJS(action.data));
    case GET_PROFILE_SUCCESS:
      return state
        .setIn(['user', 'auth'], true)
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'error'], false)
        .setIn(['user', 'info'], fromJS(action.data));
    case GET_INVENTORY_FAIL:
      return state
        .setIn(['user', 'loading'], false)
        .setIn(['user', 'loaded'], true)
        .setIn(['user', 'error'], true);
    case GET_PROFILE_FAIL:
      return state.setIn(['user', 'auth'], false);
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
    case SELECT_PLAYER_ITEM:
      return state.setIn(
        ['trade', 'itemsOffer'],
        fromJS([
          ...state
            .get('trade')
            .get('itemsOffer')
            .toJS(),
          action.item,
        ]),
      );
    case SELECT_BOT_ITEM:
      return state.setIn(
        ['trade', 'itemsReceive'],
        fromJS([
          ...state
            .get('trade')
            .get('itemsReceive')
            .toJS(),
          action.item,
        ]),
      );
    case REMOVE_PLAYER_ITEM:
      return state.setIn(
        ['trade', 'itemsOffer'],
        fromJS(
          _.filter(
            state
              .get('trade')
              .get('itemsOffer')
              .toJS(),
            i => i.assetid !== action.item.assetid,
          ),
        ),
      );
    case REMOVE_BOT_ITEM:
      return state.setIn(
        ['trade', 'itemsReceive'],
        fromJS(
          _.filter(
            state
              .get('trade')
              .get('itemsReceive')
              .toJS(),
            i => i.assetid !== action.item.assetid,
          ),
        ),
      );
    default:
      return state;
  }
}

export default homeReducer;
