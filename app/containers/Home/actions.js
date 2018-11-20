/*
 *
 * Home actions
 *
 */

import _ from 'lodash';
import {
  DEFAULT_ACTION,
  CALL_STEAM_AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  GET_BOT_ITEMS,
  GET_BOT_ITEMS_SUCCESS,
  GET_BOT_ITEMS_FAIL,
  GET_PROFILE_SUCCESS,
  LOGOUT_STEAM,
  STEAM_OAUTH,
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
export function steamAuthenticateSuccess(data) {
  return {
    type: AUTHENTICATE_SUCCESS,
    data: data.map(item => ({
      name: item.name,
      rarity: _.words(item.type)[0],
      instanceid: item.instanceid,
      classid: item.classid,
      assetid: item.assetid,
      image: item.icon_url,
      market_hash_name: item.market_hash_name,
      market_tradable_restriction: item.market_tradable_restriction,
      market_marketable_restriction: item.market_marketable_restriction,
      marketable: item.marketable,
      tags: item.tags,
    })),
  };
}
export function steamAuthenticateFail() {
  return {
    type: AUTHENTICATE_FAIL,
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
    data: data.map(item => ({
      name: item.name,
      rarity: _.words(item.type)[0],
      instanceid: item.instanceid,
      classid: item.classid,
      assetid: item.assetid,
      image: item.icon_url,
      market_hash_name: item.market_hash_name,
      market_tradable_restriction: item.market_tradable_restriction,
      market_marketable_restriction: item.market_marketable_restriction,
      marketable: item.marketable,
      tags: item.tags,
    })),
  };
}
export function getBotItemsFail() {
  return {
    type: GET_BOT_ITEMS_FAIL,
  };
}
export function steamOauth() {
  return {
    type: STEAM_OAUTH,
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
