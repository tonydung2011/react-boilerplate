/*
 *
 * DotaItemsAll actions
 *
 */

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
  RELOAD_DOTA_ITEMS,
  UPDATE_SORT,
  UPDATE_HERO,
  UPDATE_RARITY,
  UPDATE_MARKET_HASH_NAME,
  UPDATE_MIN_PRICE,
  UPDATE_MAX_PRICE,
  SUBMIT_PASSWORD,
  SUBMIT_PASSWORD_SUCCESS,
  SUBMIT_PASSWORD_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function updatePage(page) {
  return {
    type: UPDATE_PAGE,
    page,
  };
}
export function updateLimit(limit) {
  return {
    type: UPDATE_LIMIT,
    limit,
  };
}
export function updateSort(sort) {
  return {
    type: UPDATE_SORT,
    sort,
  };
}
export function updateHero(hero) {
  return {
    type: UPDATE_HERO,
    hero,
  };
}
export function updateRarity(rarity) {
  return {
    type: UPDATE_RARITY,
    rarity,
  };
}
export function updateMarketHashName(marketHashName) {
  return {
    type: UPDATE_MARKET_HASH_NAME,
    marketHashName,
  };
}
export function updateMinPrice(minPrice) {
  return {
    type: UPDATE_MIN_PRICE,
    minPrice,
  };
}
export function updateMaxPrice(maxPrice) {
  return {
    type: UPDATE_MAX_PRICE,
    maxPrice,
  };
}
export function getDotaItems() {
  return {
    type: GET_ALL_DOTA_ITEMS,
  };
}
export function reloadDotaItem(query = {}) {
  return {
    type: RELOAD_DOTA_ITEMS,
    query,
  };
}
export function loadAllDotaItemsSuccess(data) {
  return {
    type: GET_DOTA_ITEMS_SUCCESS,
    data,
  };
}
export function loadAllDotaItemsFail(error) {
  return {
    type: GET_DOTA_ITEMS_FAIL,
    error,
  };
}

export function updateDotaItems(data) {
  return {
    type: UPDATE_DOTA_ITEMS,
    data,
  };
}

export function updateDotaItemsSuccess() {
  return {
    type: UPDATE_DOTA_ITEMS_SUCCESS,
  };
}

export function updateDotaItemsFail(error) {
  return {
    type: UPDATE_DOTA_ITEMS_FAIL,
    error,
  };
}

export function submitPassword(password) {
  return {
    type: SUBMIT_PASSWORD,
    password,
  };
}

export function submitPasswordSuccess() {
  return {
    type: SUBMIT_PASSWORD_SUCCESS,
  };
}

export function submitPasswordFail() {
  window.localStorage.removeItem('tradewithme/admin');
  return {
    type: SUBMIT_PASSWORD_FAIL,
  };
}
