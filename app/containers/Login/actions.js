/*
 *
 * Login actions
 *
 */

import {
  DEFAULT_ACTION,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function adminLogin(payload) {
  return {
    type: ADMIN_LOGIN,
    payload,
  };
}

export function adminLoginSuccess() {
  return {
    type: ADMIN_LOGIN_SUCCESS,
  };
}

export function adminLoginFail() {
  window.localStorage.removeItem('tradewithme/token');
  return {
    type: ADMIN_LOGIN_FAIL,
  };
}
