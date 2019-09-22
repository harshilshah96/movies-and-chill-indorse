import { IPeopleModelAPI, PeopleModel } from '../Models/PeopleModel';
import { get } from '../utilities/http';
import { IMovieModelAPI } from '../Models/MovieListModel';

export const getPeopleDetails = async (id: string) => {
  const { data: peopleDetails } = await get<IPeopleModelAPI>(`/person/${id}`);
  const {
    also_known_as,
    id: peopleId,
    biography,
    birthday,
    gender,
    known_for_department,
    name,
    profile_path
  } = peopleDetails;
  const { data: peopleMovieDetails } = await get<{
    cast: Array<IMovieModelAPI>;
  }>(`/person/${id}/movie_credits`);
  const personModel = new PeopleModel({
    id: peopleId.toString(),
    biography,
    birthday,
    gender,
    known_for_department,
    name,
    profile_path,
    also_known_as,
    movie_credits: { cast: peopleMovieDetails.cast }
  });
  personModel.$save();
  return personModel;
};
