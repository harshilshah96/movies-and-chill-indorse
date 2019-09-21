import { IMovieModelAPI } from './MovieListModel';
import { BaseModel } from './BaseModel';

export interface IPeopleModelAPI {
  id?: string;
  name?: string;
  birthday?: string;
  known_for_department?: string;
  gender?: number;
  also_known_as?: Array<string>;
  biography?: string;
  profile_path?: string;
}

export interface IPeopleModelProps extends IPeopleModelAPI {
  movie_credits?: {
    cast?: Array<IMovieModelAPI>;
  };
}

export class PeopleModel extends BaseModel<IPeopleModelProps> {
  constructor(props: IPeopleModelProps) {
    super(props);
  }

  static resource = 'people';
}
