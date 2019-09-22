import * as Immutable from 'immutable';
import { BaseModel } from './src/Models/BaseModel';
import { IAsyncState } from './src/components/ReusableComponents/Async';
import { IMovieListType } from './src/Models/MovieListModel';
import { IPageType } from './src/reducers/pageReducer';

export interface IState {
  models: Immutable.Map<string, BaseModel<{}>>;
  loading: Immutable.Map<string, IAsyncState>;
  page: { [key in IMovieListType | 'search']: IPageType };
}
