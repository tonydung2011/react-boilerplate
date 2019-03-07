import { takeEvery, call, put } from 'redux-saga/effects';
import Config from 'utils/config';
import request from 'utils/request';
import { navigateToPage } from 'utils/utils';

import { adminLoginFail, adminLoginSuccess } from './actions';
import { ADMIN_LOGIN } from './constants';

// Individual exports for testing

export function* adminAuthenticateSaga(action) {
  try {
    const res = yield call(request, Config.api.adminAuthenticate, {
      method: 'POST',
      body: JSON.stringify({
        password: action.payload.password,
        email: action.payload.email,
      }),
    });
    if (res.token) {
      window.localStorage.setItem('tradewithme/token', res.token.accessToken);
      yield put(adminLoginSuccess());
      yield put(navigateToPage('/admin'));
    } else {
      yield put(adminLoginFail());
    }
  } catch (err) {
    yield put(adminLoginFail());
  }
}

export default function* loginSaga() {
  yield takeEvery(ADMIN_LOGIN, adminAuthenticateSaga);
}
