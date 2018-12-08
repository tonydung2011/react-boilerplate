import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import Config from 'utils/config';
import {
  getInventorySuccess,
  getBotItemsSuccess,
  getBotItemsFail,
  getProfileSuccess,
  getInventoryFail,
  getProfileFail,
} from './actions';
import { CALL_STEAM_AUTHENTICATE, GET_BOT_ITEMS } from './constants';

export function* getUserInventorySaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    if (!id) throw new Error('Steam Authentication require');
    const res = yield call(request, `${Config.api.getPlayerInventory}${id}`);
    yield put(getInventorySuccess(res));
  } catch (error) {
    yield put(getInventoryFail());
  }
}

export function* getUserProfileSaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    if (!id) throw new Error('Steam Authentication require');
    const info = yield call(request, `${Config.api.getPlayerProfile}${id}`);
    yield put(getProfileSuccess(info));
  } catch (error) {
    yield put(getProfileFail());
  }
}

export function* getBotItemsSaga() {
  const state = yield select();
  const botId = state
    .get('home')
    .get('bot')
    .get('id');
  try {
    const url = new URL(Config.api.getBotItems);
    url.searchParams.append('bot', botId);
    const res = yield call(request, url);
    yield put(getBotItemsSuccess(res));
  } catch (error) {
    yield put(getBotItemsFail());
  }
}

export default function* homeSaga() {
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserInventorySaga);
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserProfileSaga);
  yield takeLatest(GET_BOT_ITEMS, getBotItemsSaga);
}
