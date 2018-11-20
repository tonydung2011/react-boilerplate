import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  steamAuthenticateSuccess,
  steamAuthenticateFail,
  getBotItemsSuccess,
  getBotItemsFail,
  getProfileSuccess,
} from './actions';
import {
  CALL_STEAM_AUTHENTICATE,
  GET_BOT_ITEMS,
  STEAM_OAUTH,
} from './constants';

export function* callSteamAuthenticateSaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    if (!id) throw new Error('Steam Authentication require');
    const res = yield call(request, `${process.env.GET_PLAYER_INVENTORY}${id}`);
    const info = yield call(request, `${process.env.GET_PLAYER_PROFILE}${id}`);
    yield put(steamAuthenticateSuccess(res));
    yield put(getProfileSuccess(info));
  } catch (error) {
    yield put(steamAuthenticateFail());
  }
}

export function* getBotItemsSaga() {
  const state = yield select();
  const botId = state
    .get('home')
    .get('bot')
    .get('id');
  try {
    const res = yield call(
      request,
      `${process.env.GET_PLAYER_INVENTORY}${botId}`,
    );
    yield put(getBotItemsSuccess(res));
  } catch (error) {
    yield put(getBotItemsFail());
  }
}

export function* steamOauthSaga() {
  try {
    yield call(request, process.env.STEAM_OAUTH);
  } catch (error) {
    console.log('error', error);
  }
}

export default function* homeSaga() {
  yield takeEvery(CALL_STEAM_AUTHENTICATE, callSteamAuthenticateSaga);
  yield takeLatest(GET_BOT_ITEMS, getBotItemsSaga);
  yield takeLatest(STEAM_OAUTH, steamOauthSaga);
}
