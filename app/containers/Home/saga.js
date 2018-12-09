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
  toggleTradeUrlInputModal,
  createNewOfferSuccess,
  createNewOfferFail,
  tradeUrlVerified,
  tradeUrlUnVerified,
} from './actions';
import {
  CALL_STEAM_AUTHENTICATE,
  GET_BOT_ITEMS,
  CREATE_NEW_OFFER,
} from './constants';

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

export function* createNewOfferSaga() {
  const state = yield select();
  if (state.getIn(['home', 'trade', 'urlTrade'])) {
    try {
      const url = new URL(Config.api.createNewOffer);
      const res = yield call(request, url, {
        method: 'POST',
        body: JSON.stringify({
          tradeUrl: state.getIn(['home', 'trade', 'urlTrade']),
          playerItems: state
            .getIn(['home', 'trade', 'itemsOffer'])
            .map(item => ({
              assetid: item.assetid,
            }))
            .toJS(),
          botItems: state
            .getIn(['home', 'trade', 'itemsReceive'])
            .map(item => ({
              assetid: item.assetid,
            }))
            .toJS(),
        }),
      });
      yield put(createNewOfferSuccess(res));
      yield put(tradeUrlVerified());
    } catch (error) {
      yield put(createNewOfferFail());
      if (error.message === 'invalid trade url') {
        yield put(tradeUrlUnVerified());
      }
    }
  } else {
    yield put(toggleTradeUrlInputModal());
  }
}

export default function* homeSaga() {
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserInventorySaga);
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserProfileSaga);
  yield takeLatest(CREATE_NEW_OFFER, createNewOfferSaga);
  yield takeLatest(GET_BOT_ITEMS, getBotItemsSaga);
}
