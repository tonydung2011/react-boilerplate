/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  STEAM_AUTHENTICATE,
  CALL_STEAM_AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function startAuthenticate(id) {
  return {
    type: STEAM_AUTHENTICATE,
    id,
  };
}
export function callSteamAuthenticate() {
  return {
    type: CALL_STEAM_AUTHENTICATE,
  };
}
export function steamAuthenticateSuccess(payload) {
  return {
    type: AUTHENTICATE_SUCCESS,
    payload,
  };
}
export function steamAuthenticateFail() {
  return {
    type: AUTHENTICATE_FAIL,
  };
}
