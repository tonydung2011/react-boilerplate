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
  UPDATE_TRADE_URL,
  TRADE_URL_VERIFIED,
  TOGGLE_TRADE_URL_INPUT_MODAL,
  CREATE_NEW_OFFER_SUCCESS,
  CREATE_NEW_OFFER_FAIL,
  TOGGLE_RESULT_MODAL,
  TRADE_URL_UNVERIFIED,
  CLEAR_BOT_SELECTED_ITEMS,
  CLEAR_PLAYER_SELECTED_ITEMS,
  CREATE_NEW_OFFER,
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
    urlVerified: false,
    showTradeUrlInputModal: false,
    loading: false,
    error: false,
    done: false,
    showResultModal: false,
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
    case UPDATE_TRADE_URL:
      return state
        .setIn(['trade', 'urlTrade'], action.url)
        .setIn(['trade', 'urlVerified'], false);
    case TRADE_URL_VERIFIED:
      window.localStorage.setItem(
        'tradewithme/trade-url',
        state.getIn('trade', state.getIn(['trade', 'urlTrade'])),
      );
      return state.setIn(['trade', 'urlVerified'], true);
    case TRADE_URL_UNVERIFIED:
      window.localStorage.removeItem('tradewithme/trade-url');
      return state
        .setIn(['trade', 'urlVerified'], false)
        .setIn(['trade', 'urlTrade'], '');
    case TOGGLE_RESULT_MODAL:
      return state.setIn(
        ['trade', 'showResultModal'],
        !state.getIn(['trade', 'showResultModal']),
      );
    case TOGGLE_TRADE_URL_INPUT_MODAL:
      return state.setIn(
        ['trade', 'showTradeUrlInputModal'],
        !state.getIn(['trade', 'showTradeUrlInputModal']),
      );
    case CREATE_NEW_OFFER:
      return state
        .setIn(['trade', 'loading'], true)
        .setIn(['trade', 'done'], false)
        .setIn(['trade', 'error'], false);
    case CREATE_NEW_OFFER_SUCCESS:
      return state
        .setIn(['trade', 'showResultModal'], true)
        .setIn(['trade', 'done'], true)
        .setIn(['trade', 'loading'], false)
        .setIn(['trade', 'error'], false);
    case CREATE_NEW_OFFER_FAIL:
      return state
        .setIn(['trade', 'showResultModal'], true)
        .setIn(['trade', 'done'], true)
        .setIn(['trade', 'loading'], false)
        .setIn(['trade', 'error'], true);
    case CLEAR_BOT_SELECTED_ITEMS:
      return state.setIn(['trade', 'itemsReceive'], fromJS([]));
    case CLEAR_PLAYER_SELECTED_ITEMS:
      return state.setIn(['trade', 'itemsOffer'], fromJS([]));
    default:
      return state;
  }
}

export default homeReducer;
