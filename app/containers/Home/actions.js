/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  CALL_STEAM_AUTHENTICATE,
  GET_INVENTORY_SUCCESS,
  GET_BOT_ITEMS,
  GET_BOT_ITEMS_SUCCESS,
  GET_BOT_ITEMS_FAIL,
  GET_PROFILE_SUCCESS,
  LOGOUT_STEAM,
  SELECT_PLAYER_ITEM,
  REMOVE_PLAYER_ITEM,
  SELECT_BOT_ITEM,
  REMOVE_BOT_ITEM,
  GET_INVENTORY_FAIL,
  UPDATE_TRADE_URL,
  CREATE_NEW_OFFER,
  TRADE_URL_VERIFIED,
  TOGGLE_TRADE_URL_INPUT_MODAL,
  CREATE_NEW_OFFER_FAIL,
  OFFER_ADD_TO_QUEUE_SUCCESS,
  TOGGLE_RESULT_MODAL,
  TRADE_URL_UNVERIFIED,
  CLEAR_PLAYER_SELECTED_ITEMS,
  CLEAR_BOT_SELECTED_ITEMS,
  TOOGLE_TRADE_LOADING,
  GET_OFFER_STATUS,
  CREATE_OFFER_SUCCESS,
  NOT_GET_OFFER_STATUS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function callSteamAuthenticate() {
  return {
    type: CALL_STEAM_AUTHENTICATE,
  };
}
export function getInventorySuccess(data) {
  return {
    type: GET_INVENTORY_SUCCESS,
    data,
  };
}
export function getProfileFail() {
  return {
    type: GET_INVENTORY_FAIL,
  };
}
export function getInventoryFail() {
  return {
    type: GET_INVENTORY_FAIL,
  };
}
export function getBotItems() {
  return {
    type: GET_BOT_ITEMS,
  };
}
export function getBotItemsSuccess(data) {
  return {
    type: GET_BOT_ITEMS_SUCCESS,
    data,
  };
}
export function getBotItemsFail() {
  return {
    type: GET_BOT_ITEMS_FAIL,
  };
}
export function getProfileSuccess(data) {
  return {
    type: GET_PROFILE_SUCCESS,
    data: data.response.players[0],
  };
}
export function logout() {
  window.localStorage.removeItem('tradewithme/user-id');
  return {
    type: LOGOUT_STEAM,
  };
}
export function selectPlayerItem(item) {
  return {
    type: SELECT_PLAYER_ITEM,
    item,
  };
}
export function removePlayerItem(item) {
  return {
    type: REMOVE_PLAYER_ITEM,
    item,
  };
}
export function selectBotItem(item) {
  return {
    type: SELECT_BOT_ITEM,
    item,
  };
}
export function removeBotItem(item) {
  return {
    type: REMOVE_BOT_ITEM,
    item,
  };
}
export function updateTradeUrl(url) {
  return {
    type: UPDATE_TRADE_URL,
    url,
  };
}

export function createNewOffer() {
  return {
    type: CREATE_NEW_OFFER,
  };
}
export function offerAddToQueueSuccess(payload) {
  return {
    type: OFFER_ADD_TO_QUEUE_SUCCESS,
    payload,
  };
}
export function createNewOfferFail() {
  return {
    type: CREATE_NEW_OFFER_FAIL,
  };
}

export function tradeUrlVerified() {
  return {
    type: TRADE_URL_VERIFIED,
  };
}
export function tradeUrlUnVerified() {
  return {
    type: TRADE_URL_UNVERIFIED,
  };
}
export function toggleTradeUrlInputModal() {
  return {
    type: TOGGLE_TRADE_URL_INPUT_MODAL,
  };
}
export function toggleResultModal() {
  return {
    type: TOGGLE_RESULT_MODAL,
  };
}
export function clearPlayerSelectedItems() {
  return {
    type: CLEAR_PLAYER_SELECTED_ITEMS,
  };
}
export function clearBotSelectedItems() {
  return {
    type: CLEAR_BOT_SELECTED_ITEMS,
  };
}
export function toogleTradeLoading() {
  return {
    type: TOOGLE_TRADE_LOADING,
  };
}
export function getOfferStatus() {
  return {
    type: GET_OFFER_STATUS,
  };
}
export function notGetOfferStatus() {
  return {
    type: NOT_GET_OFFER_STATUS,
  };
}
export function createNewOfferSuccess() {
  return {
    type: CREATE_OFFER_SUCCESS,
  };
}
