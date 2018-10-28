import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { GET_ALL_DOTA_ITEMS } from './constants';
import { loadAllDotaItemsFail, loadAllDotaItemsSuccess } from './actions';

// Individual exports for testing
export function* getAllDotaItemsSaga() {
  try {
    const data = yield call(request, process.env.GET_ALL_DOTA_ITEMS_ENDPOINT);
    yield put(loadAllDotaItemsSuccess(data.data));
  } catch (error) {
    yield put(loadAllDotaItemsFail(error));
  }
}

export default function* dotaItemsAllSaga() {
  yield takeLatest(GET_ALL_DOTA_ITEMS, getAllDotaItemsSaga);
}
