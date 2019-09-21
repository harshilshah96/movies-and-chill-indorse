import { fromJS } from 'immutable';

const SUCCESS_STATE = {
  isLoading: false,
  hasError: false
};
export const LOADING_STATE = {
  isLoading: true,
  hasError: false
};
const ERROR_STATE = {
  isLoading: false,
  hasError: true
};

export function loadingReducers(
  state = fromJS(LOADING_STATE),
  { type, meta, payload }
) {
  let typeTokens = type.split('/');

  switch (typeTokens[1]) {
    case 'LOADING':
      return state.set(meta.identifer, SUCCESS_STATE);
    case 'LOADING_PENDING':
      return state.set(meta.identifier, LOADING_STATE);
    case 'LOADING_FULFILLED':
      return state.set(meta.identifier, SUCCESS_STATE);
    case 'LOADING_REJECTED':
      return state.set(meta.identifier, ERROR_STATE);
    case 'SET_LOADING_STATE':
      return state.set(meta.identifier, payload);
    case 'SET_LOADING':
      return state.set(meta.identifier, LOADING_STATE);
    case 'SET_SUCCESS':
      return state.set(meta.identifier, SUCCESS_STATE);
    case 'SET_ERROR':
      return state.set(meta.identifier, ERROR_STATE);
    default:
      return state;
  }
}
