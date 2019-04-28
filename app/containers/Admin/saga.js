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
import { navigateToPage } from 'utils/utils';
import { adminLoginFail } from 'containers/Login/actions';
import _ from 'lodash';
import {
  GET_ALL_DOTA_ITEMS,
  UPDATE_DOTA_ITEMS,
  RELOAD_DOTA_ITEMS,
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
    url.searchParams.append('minPrice', minPrice);
    url.searchParams.append('maxPrice', maxPrice);
    url.searchParams.append('market_hash_name', marketHashName);
    const data = yield call(request, url.href, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          'tradewithme/token',
        )}`,
      },
      signal,
    });
    yield put(loadAllDotaItemsSuccess(data));
  } catch (error) {
    if (error.response.status === 401) {
      yield put(navigateToPage('/login'));
      yield put(adminLoginFail());
    }
    yield put(loadAllDotaItemsFail(error));
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

export function* reloadDotaItemsToDefaultSaga(action) {
  yield put.resolve(updatePage(1));
  if (action && action.query.page) {
    yield put.resolve(updatePage(action.query.page));
  }
  if (action && action.query.limit) {
    yield put.resolve(updateLimit(action.query.limit));
  }
  if (action && typeof action.query.hero === 'string') {
    yield put.resolve(updateHero(action.query.hero));
  }
  if (action && typeof action.query.rarity === 'string') {
    yield put.resolve(updateRarity(action.query.rarity));
  }
  if (action && typeof action.query.marketHashName === 'string') {
    yield put.resolve(updateMarketHashName(action.query.marketHashName));
  }
  if (action && action.query.sort) {
    yield put.resolve(updateSort(action.query.sort));
  }
  if (action && typeof action.query.maxPrice === 'string') {
    yield put.resolve(updateMaxPrice(action.query.maxPrice));
  }
  if (action && typeof action.query.minPrice === 'string') {
    yield put.resolve(updateMinPrice(action.query.minPrice));
  }
  yield put(getDotaItems());
}

export function* updateDotaItemsSaga(action) {
  try {
    const state = yield select();
    const data = state.getIn(['Admin', 'data']).toJS();
    const param = _.map(action.data, i => {
      const item = _.find(data, v => v.marketHashName === i.marketHashName);
      return {
        marketHashName: i.marketHashName,
        tradable: typeof i.tradable === 'boolean' ? i.tradable : item.tradable,
        marketRate: i.marketRate ? i.marketRate : item.marketRate,
        overstock: i.overstock ? i.overstock : item.overstock,
      };
    });
    yield call(request, Config.api.updateItems, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          'tradewithme/token',
        )}`,
      },
      body: JSON.stringify({
        data: param,
      }),
      method: 'PUT',
    });
    yield put(updateDotaItemsSuccess());
    yield put(getDotaItems());
  } catch (error) {
    if (error.response.status === 401) {
      yield put(navigateToPage('/login'));
      yield put(adminLoginFail());
    }
    yield put(updateDotaItemsFail(error));
  }
}

export default function* dotaItemsAllSaga() {
  yield takeEvery(UPDATE_DOTA_ITEMS, updateDotaItemsSaga);
  yield takeLatest(GET_ALL_DOTA_ITEMS, getDotaItemsOnStateSaga);
  yield takeLatest(RELOAD_DOTA_ITEMS, reloadDotaItemsToDefaultSaga);
}
