import {
  takeLatest,
  call,
  put,
  takeEvery,
  select,
  cancelled,
} from 'redux-saga/effects';
import Config from 'utils/config';
import request from 'utils/request';
import {
  GET_ALL_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS_SUCCESS,
  UPDATE_LIMIT,
  UPDATE_PAGE,
  RELOAD_DOTA_ITEMS,
} from './constants';
import {
  loadAllDotaItemsFail,
  loadAllDotaItemsSuccess,
  updateDotaItemsFail,
  updateDotaItemsSuccess,
  loadDotaItems,
  updatePage,
  updateLimit,
  updateHero,
  updateRarity,
  updateMarketHashName,
  updateSort,
  updateMaxPrice,
  updateMinPrice,
} from './actions';

// Individual exports for testing
export function* getDotaItemsOnStateSaga(action) {
  const abortController = new AbortController();
  const { signal } = abortController;
  try {
    const state = yield select();
    const limit = state.get('dotaItemsAll').get('limit');
    const page = state.get('dotaItemsAll').get('page');
    const marketHashName = state.get('dotaItemsAll').get('marketHashName');
    const rarity = state.get('dotaItemsAll').get('rarity');
    const hero = state.get('dotaItemsAll').get('hero');
    const sort = state.get('dotaItemsAll').get('sort');
    const minPrice = state.get('dotaItemsAll').get('minPrice');
    const maxPrice = state.get('dotaItemsAll').get('maxPrice');
    const url = new URL(Config.api.getAllDotaItems);
    url.searchParams.append('limit', limit);
    url.searchParams.append('page', page);
    url.searchParams.append('rarity', rarity);
    url.searchParams.append('hero', hero);
    url.searchParams.append('sort', sort);
    url.searchParams.append('min_price', minPrice);
    url.searchParams.append('max_price', maxPrice);
    url.searchParams.append('market_hash_name', marketHashName);
    Object.keys(action.query).forEach(key =>
      url.searchParams.append(key, action.query[key]),
    );
    const data = yield call(request, url.href, { signal });
    yield put(loadAllDotaItemsSuccess(data));
  } catch (error) {
    yield put(loadAllDotaItemsFail(error));
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

export function* reloadDotaItemsToDefaultSaga(action) {
  yield put(updatePage(1));
  yield put(updateLimit(10));
  if (action && action.query) {
    yield put(updateHero(action.query.hero));
    yield put(updateRarity(action.query.rarity));
    yield put(updateMarketHashName(action.query.marketHashName));
    yield put(updateSort(action.query.sort));
    yield put(updateMaxPrice(action.query.maxPrice));
    yield put(updateMinPrice(action.query.minPrice));
  }
  yield put(loadDotaItems());
}

export function* updateDotaItemsSaga(action) {
  try {
    yield call(request, Config.api.updateItems, {
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

export function* loadDotaItemsOnChange() {
  yield put(loadDotaItems());
}

export default function* dotaItemsAllSaga() {
  yield takeEvery(UPDATE_DOTA_ITEMS, updateDotaItemsSaga);
  yield takeLatest([UPDATE_LIMIT, UPDATE_PAGE], loadDotaItemsOnChange);
  yield takeLatest(GET_ALL_DOTA_ITEMS, getDotaItemsOnStateSaga);
  yield takeLatest(
    [RELOAD_DOTA_ITEMS, UPDATE_DOTA_ITEMS_SUCCESS],
    reloadDotaItemsToDefaultSaga,
  );
}
