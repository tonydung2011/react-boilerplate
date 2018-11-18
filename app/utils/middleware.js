import { LOCATION_CHANGE } from 'react-router-redux';
import { callSteamAuthenticate } from 'containers/Home/actions';

export const locationMiddleware = store => next => action => {
  if (action.type === LOCATION_CHANGE) {
    const homeState = store.getState().get('home');
    if (homeState && !homeState.getIn(['user', 'auth'])) {
      const userId = window.localStorage.getItem('tradewithme/user-id');
      if (userId) {
        store.dispatch(callSteamAuthenticate(userId));
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
      window.localStorage.setItem('tradewithme/user-id', userId);
    }
  }
  return next(action);
};
