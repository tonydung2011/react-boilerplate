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
export function loadDotaItems(query = {}) {
  return {
    type: GET_ALL_DOTA_ITEMS,
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
