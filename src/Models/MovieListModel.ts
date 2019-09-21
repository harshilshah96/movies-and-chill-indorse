import { BaseModel } from './BaseModel';

export interface IMovieModelAPI {
  id?: string;
  poster_path?: string;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  title?: string;
  popularity?: number;
  vote_average?: number;
}
export interface IMovieModelProps extends IMovieModelAPI {
  type: 'popular' | 'topRated' | 'nowPlaying';
}

export class MovieListModel extends BaseModel<IMovieModelProps> {
  constructor(props: IMovieModelProps) {
    super(props);
  }
  static resource = 'movies';
}
