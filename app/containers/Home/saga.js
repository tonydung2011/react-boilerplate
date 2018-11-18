import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import {
  steamAuthenticateSuccess,
  steamAuthenticateFail,
  getBotItemsSuccess,
  getBotItemsFail,
} from './actions';
import { CALL_STEAM_AUTHENTICATE, GET_BOT_ITEMS } from './constants';

export function* callSteamAuthenticateSaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    const res = yield call(request, `${process.env.GET_PLAYER_INVENTORY}${id}`);
    yield put(steamAuthenticateSuccess(res));
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

export default function* homeSaga() {
  yield takeEvery(CALL_STEAM_AUTHENTICATE, callSteamAuthenticateSaga);
  yield takeLatest(GET_BOT_ITEMS, getBotItemsSaga);
}
