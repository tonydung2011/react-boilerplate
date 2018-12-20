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
  RELOAD_DOTA_ITEMS,
  SUBMIT_PASSWORD,
} from './constants';
import {
  loadAllDotaItemsFail,
  loadAllDotaItemsSuccess,
  updateDotaItemsFail,
  updateDotaItemsSuccess,
  getDotaItems,
  updatePage,
  updateLimit,
  updateHero,
  updateRarity,
  updateMarketHashName,
  updateSort,
  updateMaxPrice,
  updateMinPrice,
  submitPasswordFail,
  submitPasswordSuccess,
  reloadDotaItem,
} from './actions';

// Individual exports for testing
export function* getDotaItemsOnStateSaga() {
  const abortController = new AbortController();
  const { signal } = abortController;
  try {
    const state = yield select();
    const limit = state.get('Admin').get('limit');
    const page = state.get('Admin').get('page');
    const marketHashName = state.get('Admin').get('marketHashName');
    const rarity = state.get('Admin').get('rarity');
    const hero = state.get('Admin').get('hero');
    const sort = state.get('Admin').get('sort');
    const minPrice = state.get('Admin').get('minPrice');
    const maxPrice = state.get('Admin').get('maxPrice');
    const url = new URL(Config.api.getAllDotaItems);
    url.searchParams.append('limit', limit);
    url.searchParams.append('page', page);
    url.searchParams.append('rarity', rarity);
    url.searchParams.append('hero', hero);
    url.searchParams.append('sort', sort);
    url.searchParams.append('min_price', minPrice);
    url.searchParams.append('max_price', maxPrice);
    url.searchParams.append('market_hash_name', marketHashName);
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
  yield put.resolve(updatePage(1));
  yield put.resolve(updateLimit(10));
  if (action && action.query.hero) {
    yield put.resolve(updateHero(action.query.hero));
  }
  if (action && action.query.page) {
    yield put.resolve(updatePage(action.query.page));
  }
  if (action && action.query.limit) {
    yield put.resolve(updateLimit(action.query.limit));
  }
  if (action && action.query.rarity) {
    yield put.resolve(updateRarity(action.query.rarity));
  }
  if (action && action.query.marketHashName) {
    yield put.resolve(updateMarketHashName(action.query.marketHashName));
  }
  if (action && action.query.sort) {
    yield put.resolve(updateSort(action.query.sort));
  }
  if (action && action.query.maxPrice) {
    yield put.resolve(updateMaxPrice(action.query.maxPrice));
  }
  if (action && action.query.minPrice) {
    yield put.resolve(updateMinPrice(action.query.minPrice));
  }
  yield put(getDotaItems());
}

export function* updateDotaItemsSaga(action) {
  try {
    yield call(request, Config.api.updateItems, {
      body: JSON.stringify({
        data: action.data,
      }),
      method: 'POST',
    });
    yield put(updateDotaItemsSuccess());
  } catch (error) {
    yield put(updateDotaItemsFail(error));
  }
}

export function* adminAuthenticateSaga(action) {
  try {
    const res = yield call(request, Config.api.adminAuthenticate, {
      method: 'POST',
      body: JSON.stringify({
        password: action.password,
      }),
    });
    if (res.success) {
      window.localStorage.setItem('tradewithme/admin', action.password);
      yield put(submitPasswordSuccess());
      yield put(reloadDotaItem({}));
    } else {
      yield put(submitPasswordFail());
    }
  } catch (err) {
    yield put(submitPasswordFail());
  }
}

export default function* dotaItemsAllSaga() {
  yield takeEvery(UPDATE_DOTA_ITEMS, updateDotaItemsSaga);
  yield takeLatest(GET_ALL_DOTA_ITEMS, getDotaItemsOnStateSaga);
  yield takeLatest(
    [RELOAD_DOTA_ITEMS, UPDATE_DOTA_ITEMS_SUCCESS],
    reloadDotaItemsToDefaultSaga,
  );
  yield takeEvery(SUBMIT_PASSWORD, adminAuthenticateSaga);
}
