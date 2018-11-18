import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { steamAuthenticateSuccess, steamAuthenticateFail } from './actions';
import { CALL_STEAM_AUTHENTICATE } from './constants';

export function* callSteamAuthenticateSaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    const res = yield call(request, `${process.env.GET_PLAYER_INVENTORY}${id}`);
    yield put(steamAuthenticateSuccess(res));
  } catch (error) {
    yield put(steamAuthenticateFail());
  }
}

// Individual exports for testing
export default function* homeSaga() {
  yield takeLatest(CALL_STEAM_AUTHENTICATE, callSteamAuthenticateSaga);
}
