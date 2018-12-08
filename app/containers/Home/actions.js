/*
 *
 * Home actions
 *
 */

import _ from 'lodash';
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
      price: item.price,
      tradable: item.tradable,
      overstock: item.overstock,
    })),
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
      price: item.price,
      tradable: item.tradable,
    })),
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
