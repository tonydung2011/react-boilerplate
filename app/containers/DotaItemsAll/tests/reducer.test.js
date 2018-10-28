import { fromJS } from 'immutable';
import dotaItemsAllReducer from '../reducer';

describe('dotaItemsAllReducer', () => {
  it('returns the initial state', () => {
    expect(dotaItemsAllReducer(undefined, {})).toEqual(fromJS({}));
  });
});
