import { SAVE_PAGE_NUMBER } from '../actions/pageActions';

export function pageReducers(state = {}, { type, payload }) {
  switch (type) {
    case SAVE_PAGE_NUMBER:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
