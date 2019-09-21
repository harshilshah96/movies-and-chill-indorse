import { BaseModel } from './BaseModel';
import { IMovieModelAPI } from './MovieListModel';
import { ICastListModelAPI } from './CastListModel';

export interface IMovieDetailModelAPI extends IMovieModelAPI {
  genres?: Array<{ id: number; name: string }>;
  release_date?: string;
  runtime?: number;
  tagline?: string;
  credits: {
    cast?: Array<ICastListModelAPI>;
  };
}

export interface IMovieDetailModelProps extends IMovieDetailModelAPI {}

export class MovieModel extends BaseModel<IMovieDetailModelProps> {
  constructor(props: IMovieDetailModelProps) {
    super(props);
  }

  static resource = 'movie';
}
