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
import { setLoading, setSuccess } from '../../../actions/loadingActions';
import { Header } from '../../ReusableComponents/Header';
import { Link } from 'react-router-dom';
import { ErrorComponent } from '../../ReusableComponents/ErrorComponent';

export interface IMovieComponentListProps {
  type?: IMovieListType;
  search?: string;
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
    if (!movieTypeData[type] && !search) {
      return;
    }
    await getMovieLists(type, 1, search);
  };

  const isFirstRun = React.useRef(true);

  const reloadList = async () => {
    setLoading(identifier);
    await promise();
    setSuccess(identifier);
  };

  const identifier = `${type || search}-list`;

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    reloadList();
  }, [type, search]);

  const { currentPage, totalPages } = useSelector((state: IState) => {
    if (!search && !type) {
      return { currentPage: 0, totalPages: 0 };
    }
    return search ? state.page.search : state.page[type];
  });

  const endCheck = () =>
    !currentPage || !totalPages || currentPage === totalPages;

  const handleWayPoint = () => {
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
      <Link to={`/movie/${movie.props.id}`}>
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
      </Link>
    ));
  };

  return (
    <>
      <Header
        title={
          search
            ? 'Search Results: '
            : movieTypeData[type]
            ? movieTypeData[type].title
            : ''
        }
      />
      <div className={`${props.type}-movie-list movie-list-container`}>
        <div className="movie-card-container">
          <Async
            promise={promise}
            identifier={identifier}
            error={<ErrorComponent />}
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
