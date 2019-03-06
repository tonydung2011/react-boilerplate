import { LOCATION_CHANGE } from 'react-router-redux';
import {
  callSteamAuthenticate,
  tradeUrlVerified,
  updateTradeUrl,
  getOfferStatus,
} from 'containers/Home/actions';

export const locationMiddleware = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    const homeState = store.getState().get('home');
    if (homeState && !homeState.getIn(['user', 'auth'])) {
      store.dispatch(callSteamAuthenticate());
      if (!homeState.getIn(['trade', 'isGettingStatus'])) {
        store.dispatch(getOfferStatus());
      }
    }
    if (
      action.payload &&
      action.payload.location &&
      action.payload.location.pathname &&
      action.payload.location.pathname === '/auth-return-url'
    ) {
      const url = new URL(window.location.href);
      const userId = url.searchParams.get('openid.claimed_id');
      const regex = /\/\d+$/;
      window.localStorage.setItem(
        'tradewithme/user-id',
        userId.substr(userId.search(regex) + 1),
      );
    }
    const tradeUrl = window.localStorage.getItem('tradewithme/trade-url');
    if (tradeUrl) {
      store.dispatch(tradeUrlVerified());
      store.dispatch(updateTradeUrl(tradeUrl));
    }
  }
  return next(action);
};
