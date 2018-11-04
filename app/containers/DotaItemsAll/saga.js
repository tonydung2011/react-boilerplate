import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  GET_ALL_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS_FAIL,
  UPDATE_DOTA_ITEMS_SUCCESS,
} from './constants';
import {
  loadAllDotaItemsFail,
  loadAllDotaItemsSuccess,
  updateDotaItemsFail,
  updateDotaItemsSuccess,
} from './actions';

// Individual exports for testing
export function* getAllDotaItemsSaga() {
  try {
    const data = yield call(request, process.env.GET_ALL_DOTA_ITEMS_ENDPOINT);
    yield put(loadAllDotaItemsSuccess(data.data));
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

export default function* dotaItemsAllSaga() {
  yield takeLatest(GET_ALL_DOTA_ITEMS, getAllDotaItemsSaga);
  yield takeEvery(UPDATE_DOTA_ITEMS, updateDotaItemsSaga);
  yield takeLatest(UPDATE_DOTA_ITEMS_SUCCESS, getAllDotaItemsSaga);
  yield takeLatest(UPDATE_DOTA_ITEMS_FAIL, getAllDotaItemsSaga);
}
