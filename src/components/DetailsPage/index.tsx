import * as React from 'react';
import { BasePage } from '../ReusableComponents/BasePage';
import { Header } from '../ReusableComponents/Header';
import { RouteComponentProps } from 'react-router';
import { Async } from '../ReusableComponents/Async';
import { getMovieDetails } from '../../services/movieServices';
import { useSelector } from 'react-redux';
import { IState } from '../../../interfaces';
import { MovieModel } from '../../Models/MovieModel';
import { Loader } from '../ReusableComponents/Loader';
import './style.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { getPeopleDetails } from '../../services/castServices';
import { PeopleModel } from '../../Models/PeopleModel';
import { Link } from 'react-router-dom';
import { ErrorComponent } from '../ReusableComponents/ErrorComponent';

const DetailsPage = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: { params },
    location: { pathname },
    history: { push }
  } = props;

  const identifier = 'details-page';

  const detailType = pathname.split('/')[1];

  const promise = async () => {
    await detailsData[detailType].promise(params.id);
  };

  /**
   * A small wrapper that helps render text details
   */
  const renderDetail = (title: string, value) => {
    return (
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <b>{title}:</b>
        {value}
      </Col>
    );
  };

  /**
   * In case of Movie details page, this function returns a list of the cast involved in the movie that
   * redirect to the cast details page on clicking.
   */
  const renderCast = () => {
    const { credits } = (details as MovieModel).props;
    return credits.cast.slice(0, 11).map((cast, index) => (
      <Col
        key={index}
        onClick={() => push(`/person/${cast.id}`)}
        className="cast-card-col"
        xs={6}
        sm={6}
        md={4}
        lg={3}
        xl={3}>
        <div className="poster-path-container">
          <Image
            src={
              cast.profile_path
                ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                : require('../../assets/user-placeholder.png')
            }
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <div>{`${cast.name} `}</div>{' '}
          {cast.character ? (
            <>
              <div>as</div>
              <div>{` ${cast.character}`}</div>
            </>
          ) : (
            <></>
          )}
        </div>
      </Col>
    ));
  };

  /**
   * In case of Cast details page, this function returns a list of movies where the person was a part of which
   * redirect to the movie details page on clicking.
   */
  const renderMovies = () => {
    const { movie_credits } = (details as PeopleModel).props;
    return movie_credits.cast.slice(0, 11).map((cast, index) => (
      <Col
        key={index}
        onClick={() => push(`/movie/${cast.id}`)}
        className="cast-card-col"
        xs={6}
        sm={6}
        md={4}
        lg={3}
        xl={3}>
        <div className="poster-path-container">
          <Image
            src={
              cast.poster_path
                ? `https://image.tmdb.org/t/p/original${cast.poster_path}`
                : require('../../assets/user-placeholder.png')
            }
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <div>{`${cast.title} `}</div>{' '}
        </div>
      </Col>
    ));
  };

  /**
   * The function responsible to render movie details
   */
  const renderMovieDetails = () => {
    const {
      props: { vote_average, overview, release_date, runtime, tagline, genres }
    } = details as MovieModel;
    return (
      <Col className="movie-text-details" xs={12} sm={12} md={9} lg={9} xl={9}>
        <Container>
          <Row style={{ marginTop: '0px' }}>
            <Col>
              <b>Overview:</b>
              <span className="textbox-details">{overview}</span>
            </Col>
          </Row>
          <Row>
            {renderDetail('Release Date', release_date)}
            {renderDetail('Rating', `${Math.round(vote_average * 10)}%`)}
          </Row>
          <Row>
            {renderDetail('Runtime', `${runtime} minutes`)}
            {renderDetail('Tagline', tagline)}
          </Row>
          <Row>
            <Col>
              <b>Genres:</b>
              {genres.map(genre => genre.name).join(', ')}
            </Col>
          </Row>
        </Container>
      </Col>
    );
  };

  /**
   * The function responsible to render person details.
   */
  const renderPersonDetails = () => {
    const {
      props: {
        biography,
        birthday,
        known_for_department,
        also_known_as,
        gender
      }
    } = details as PeopleModel;
    return (
      <Col className="movie-text-details" xs={12} sm={12} md={9} lg={9} xl={9}>
        <Container>
          <Row style={{ marginTop: '0px' }}>
            <Col>
              <b>Biography:</b>
              <span className="textbox-details">{biography}</span>
            </Col>
          </Row>
          <Row>
            {renderDetail('Birthday', birthday)}{' '}
            {renderDetail('Gender', gender === 1 ? 'Female' : 'Male')}
          </Row>
          <Row>{renderDetail('Known for', known_for_department)}</Row>
          <Row>
            <Col>
              <b>Also known as:</b>
              {also_known_as.join(', ')}
            </Col>
          </Row>
        </Container>
      </Col>
    );
  };

  const movieCheck = () => detailType === 'movie';

  /**
   * This function helps in rendering a detail based on the type of detail parameter coming in.
   */
  const typeConditionalRender = (movieKey: string, peopleKey: string) =>
    movieCheck()
      ? (details as MovieModel).props[movieKey]
      : (details as PeopleModel).props[peopleKey];

  /**
   *renderContent is called after the promise is resolved.
   */

  const renderContent = () => {
    if (!details) {
      return <></>;
    }
    const { listTitle, details: typeDetails, listFunction } = detailsData[
      detailType
    ];
    return (
      <div className="movie-details-container">
        <Container className="movie-grid-container">
          <Row className="title-container">
            <Header title={typeConditionalRender('title', 'name')} />
          </Row>
          <Row style={{ marginTop: '22px' }}>
            <Col
              style={{ height: '500px' }}
              xs={12}
              sm={12}
              md={3}
              lg={3}
              xl={3}>
              <Image
                src={`https://image.tmdb.org/t/p/original${typeConditionalRender(
                  'poster_path',
                  'profile_path'
                )}`}
              />
            </Col>
            {typeDetails()}
          </Row>
          <Row className="cast-title-container">
            <Header title={listTitle} />
          </Row>
          <Row className="cast-container">{listFunction()}</Row>
        </Container>
      </div>
    );
  };

  /**
   * detailsData object helps maintaining the mapping as per the type of page
   * that have details that need to be rendered
   */
  const detailsData = {
    movie: {
      promise: getMovieDetails,
      selectorObject: MovieModel.get(params.id) as MovieModel,
      listTitle: 'Cast',
      details: renderMovieDetails,
      listFunction: renderCast
    },
    person: {
      promise: getPeopleDetails,
      selectorObject: PeopleModel.get(params.id) as PeopleModel,
      listTitle: 'Movies',
      details: renderPersonDetails,
      listFunction: renderMovies
    }
  };

  /**
   * The Hook returns details object from the store based on type of parameter coming in
   */
  const { details }: { details: MovieModel | PeopleModel } = useSelector(
    (state: IState) => ({
      details: detailsData[detailType].selectorObject
    })
  );

  return (
    <BasePage className="movie-details-page">
      <Async
        promise={promise}
        identifier={identifier}
        loader={<Loader />}
        error={<ErrorComponent />}
        content={renderContent()}
      />
    </BasePage>
  );
};

export default DetailsPage;
