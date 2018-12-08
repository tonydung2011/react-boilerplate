import { LOCATION_CHANGE } from 'react-router-redux';
import { callSteamAuthenticate } from 'containers/Home/actions';

export const locationMiddleware = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    const homeState = store.getState().get('home');
    if (homeState && !homeState.getIn(['user', 'auth'])) {
      store.dispatch(callSteamAuthenticate());
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
  }
  return next(action);
};
