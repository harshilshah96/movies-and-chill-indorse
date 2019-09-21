import { BaseModel } from './BaseModel';

/**
 * The ICastListModelAPI is the interface that defines the type of object returned by the API call
 */
export interface ICastListModelAPI {
  cast_id?: number;
  character?: string;
  name?: string;
  id?: string;
  profile_path?: string;
  gender?: number;
}

/**
 * The ICastListModelProps interface helps in defining the type of the data that will be stored in the Redux store
 */
export interface ICastListModelProps extends ICastListModelAPI {}

export class CastListModel extends BaseModel<ICastListModelProps> {
  constructor(props: ICastListModelProps) {
    super(props);
  }

  static resource = 'cast';
}
