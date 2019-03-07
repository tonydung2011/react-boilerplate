/*
 *
 * Login reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
} from './constants';

export const initialState = fromJS({
  authenticated: 'unauthorized',
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ADMIN_LOGIN:
      return state.set('authenticated', 'loading');
    case ADMIN_LOGIN_SUCCESS:
      return state.set('authenticated', 'success');
    case ADMIN_LOGIN_FAIL:
      return state.set('authenticated', 'fail');
    default:
      return state;
  }
}

export default loginReducer;
