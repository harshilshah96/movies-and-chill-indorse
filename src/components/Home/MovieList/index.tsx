import * as React from 'react';
import { useSelector } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { IState } from '../../../../interfaces';
import { BaseModel } from '../../../Models/BaseModel';
import {
  IMovieListType,
  IMovieModelProps,
  MovieListModel
} from '../../../Models/MovieListModel';
import { getMovieLists } from '../../../services/movieServices';
import { Async } from '../../ReusableComponents/Async';
import { Loader } from '../../ReusableComponents/Loader';
import './style.scss';

export interface IMovieComponentListProps {
  type: IMovieListType;
  search?: string;
  show?: boolean;
}

const movieTypeData = {
  popular: {
    title: 'Popular'
  },
  top_rated: {
    title: 'Top Rated'
  },
  now_playing: {
    title: 'Now Playing'
  }
};

export const MovieList = (props: IMovieComponentListProps) => {
  const { type, search } = props;

  const promise = async () => {
    await getMovieLists(type, 1, search);
  };

  const identifier = `${type}-list`;

  const { currentPage, totalPages } = useSelector(
    (state: IState) => state.page
  );

  const endCheck = () =>
    !currentPage || !totalPages || currentPage === totalPages;

  const handleWayPoint = () => {
    console.log('>>32432', 32432);
    if (endCheck()) {
      return;
    }
    nextPage();
  };

  const nextPage = async () => {
    await getMovieLists(type, currentPage + 1, search);
  };

  const { movies }: { movies: BaseModel<IMovieModelProps>[] } = useSelector(
    (state: IState) => ({
      movies: MovieListModel.list(state).filter(
        movie => (movie.props as IMovieModelProps).type.indexOf(type) !== -1
      )
    })
  );

  const renderCards = () => {
    return movies.map((movie, index) => (
      <div
        className="movie-card"
        style={{ marginLeft: index === 0 ? '3px' : '22px' }}>
        <div
          className="movie-card-image"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/w300${movie.props.poster_path}")`
          }}
        />
        <div className="movie-details-container">
          <div className="movie-title">{movie.props.title}</div>
          <div className="movie-details">
            <b>Rated: </b>
            <span>{Math.round(movie.props.vote_average * 10)}%</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="list-title-container">
        <h2 className="list-title">
          {search ? 'Search Results: ' : movieTypeData[type].title}
        </h2>
      </div>
      <div className={`${props.type}-movie-list movie-list-container`}>
        <div className="movie-card-container">
          <Async
            promise={promise}
            identifier={identifier}
            error={<h3>Error</h3>}
            loader={<Loader />}
            content={renderCards()}
          />
          <Waypoint horizontal onEnter={handleWayPoint} />
          {endCheck() ? '' : <Loader />}
        </div>
      </div>
    </>
  );
};
