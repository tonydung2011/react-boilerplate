import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
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
  offerAddToQueueSuccess,
  createNewOfferFail,
  tradeUrlVerified,
  tradeUrlUnVerified,
  clearBotSelectedItems,
  clearPlayerSelectedItems,
  toogleTradeLoading,
  getOfferStatus,
  createNewOfferSuccess,
  notGetOfferStatus,
} from './actions';
import {
  CALL_STEAM_AUTHENTICATE,
  GET_BOT_ITEMS,
  CREATE_NEW_OFFER,
  GET_OFFER_STATUS,
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
      yield put(toogleTradeLoading());
      const res = yield call(request, url, {
        method: 'POST',
        body: JSON.stringify({
          tradeUrl: state.getIn(['home', 'trade', 'urlTrade']),
          playerItems: state
            .getIn(['home', 'trade', 'itemsOffer'])
            .toJS()
            .map(item => ({
              assetid: item.assetid,
            })),
          botItems: state
            .getIn(['home', 'trade', 'itemsReceive'])
            .toJS()
            .map(item => ({
              assetid: item.assetid,
            })),
          userName: state.getIn(['home', 'user', 'info', 'personaname']),
          userId: state.getIn(['home', 'user', 'info', 'steamid']),
        }),
      });
      yield put(offerAddToQueueSuccess(res));
      yield put(getOfferStatus());
      yield put(clearBotSelectedItems());
      yield put(clearPlayerSelectedItems());
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

export function* getOfferStatusSaga() {
  const id = window.localStorage.getItem('tradewithme/user-id');
  try {
    if (!id) throw new Error('Steam Authentication require');
    const res = yield call(request, `${Config.api.getOfferStatus}${id}`);
    if (res.status === 'pending' || res.status === 'started') {
      yield delay(5000);
      yield put(getOfferStatus());
    }
    if (res.status === 'success') {
      yield put(createNewOfferSuccess(res));
    }
    if (res.status === 'fail') {
      yield put(createNewOfferFail());
    }
    if (res.status === 'empty') {
      yield put(notGetOfferStatus());
    }
  } catch (error) {
    yield delay(5000);
    yield put(getOfferStatus());
  }
}

export default function* homeSaga() {
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserInventorySaga);
  yield takeEvery(CALL_STEAM_AUTHENTICATE, getUserProfileSaga);
  yield takeEvery(GET_OFFER_STATUS, getOfferStatusSaga);
  yield takeLatest(CREATE_NEW_OFFER, createNewOfferSaga);
  yield takeLatest(GET_BOT_ITEMS, getBotItemsSaga);
}
