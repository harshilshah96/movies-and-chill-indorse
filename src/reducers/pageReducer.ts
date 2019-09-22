import { SAVE_PAGE_NUMBER } from '../actions/pageActions';
import { IMovieListType } from '../Models/MovieListModel';

export interface IPageType {
  currentPage: number;
  totalPages: number;
}

export function pageReducers(
  state: { [key in IMovieListType | 'search']: IPageType } = {
    now_playing: { currentPage: 0, totalPages: 0 },
    popular: { currentPage: 0, totalPages: 0 },
    search: { currentPage: 0, totalPages: 0 },
    top_rated: { currentPage: 0, totalPages: 0 }
  },
  { type, payload }
) {
  switch (type) {
    case SAVE_PAGE_NUMBER:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
