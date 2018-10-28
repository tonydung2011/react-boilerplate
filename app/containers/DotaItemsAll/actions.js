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
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadAllDotaItems() {
  return {
    type: GET_ALL_DOTA_ITEMS,
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
