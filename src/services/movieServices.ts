import {
  IMovieListType,
  IMovieModelAPI,
  MovieListModel
} from '../Models/MovieListModel';
import { get } from '../utilities/http';
import { IMovieDetailModelAPI, MovieModel } from '../Models/MovieModel';

export interface IListPageResponse {
  page: number;
  results: Array<IMovieModelAPI>;
  total_results: number;
  total_pages: number;
}

export const getMovieLists = async (listType: IMovieListType, page: string) => {
  const { data } = await get<IListPageResponse>(`/movie/${listType}`, { page });
  let movieListData: Array<MovieListModel> = [];
  data.results.map(movie =>
    movieListData.push(
      new MovieListModel({
        adult: movie.adult,
        id: movie.id.toString(),
        overview: movie.overview,
        vote_average: movie.vote_average,
        type: listType,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        title: movie.title
      })
    )
  );
  MovieListModel.saveAll(movieListData);
  return movieListData;
};

export const getMovieDetails = async (id: string) => {
  const { data } = await get<IMovieDetailModelAPI>(`/movie/${id}`, {
    append_to_response: 'credits'
  });
  const {
    id: movieId,
    adult,
    credits,
    title,
    release_date,
    poster_path,
    popularity,
    vote_average,
    overview,
    genres,
    runtime,
    tagline
  } = data;
  const movieModel = new MovieModel({
    id: movieId.toString(),
    adult,
    credits,
    genres,
    overview,
    popularity,
    poster_path,
    release_date,
    runtime,
    tagline,
    title,
    vote_average
  });
  movieModel.$save();
  return movieModel;
};