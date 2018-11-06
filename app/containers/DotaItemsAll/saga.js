import { takeLatest, call, put, takeEvery, select } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  GET_ALL_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS_SUCCESS,
  UPDATE_LIMIT,
  UPDATE_PAGE,
} from './constants';
import {
  loadAllDotaItemsFail,
  loadAllDotaItemsSuccess,
  updateDotaItemsFail,
  updateDotaItemsSuccess,
  loadDotaItems,
} from './actions';

// Individual exports for testing
export function* getDotaItemsSaga(action) {
  try {
    const state = yield select();
    const limit = state.get('dotaItemsAll').get('limit');
    const page = state.get('dotaItemsAll').get('page');
    const url = new URL(process.env.GET_ALL_DOTA_ITEMS_ENDPOINT);
    url.searchParams.append('limit', limit);
    url.searchParams.append('page', page);
    Object.keys(action.query).forEach(key =>
      url.searchParams.append(key, action.query[key]),
    );
    const data = yield call(request, url.href);
    yield put(loadAllDotaItemsSuccess(data));
  } catch (error) {
    yield put(loadAllDotaItemsFail(error));
  }
}

export function* updateDotaItemsSaga(action) {
  try {
    yield call(request, process.env.UPDATE_DOTA_ITEMS_ENDPOINT, {
      body: JSON.stringify({
        data: action.data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    yield put(updateDotaItemsSuccess());
  } catch (error) {
    yield put(updateDotaItemsFail(error));
  }
}

export function* reloadDotaItems() {
  yield put(loadDotaItems());
}

export default function* dotaItemsAllSaga() {
  yield takeEvery(UPDATE_DOTA_ITEMS, updateDotaItemsSaga);
  yield takeLatest([UPDATE_LIMIT, UPDATE_PAGE], reloadDotaItems);
  yield takeLatest(
    [GET_ALL_DOTA_ITEMS, UPDATE_DOTA_ITEMS_SUCCESS],
    getDotaItemsSaga,
  );
}
