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

const AboutUs = (props: RouteComponentProps<{ id: string }>) => {
  const {
    match: { params }
  } = props;

  const identifier = 'movie-details-page';

  const promise = async () => {
    await getMovieDetails(params.id);
  };

  const renderDetail = (title: string, value) => {
    return (
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <b>{title}:</b>
        {value}
      </Col>
    );
  };

  const renderCast = () => {
    const { credits } = movieDetails.props;
    return credits.cast.slice(0, 11).map(cast => (
      <Col className="cast-card-col" xs={6} sm={6} md={4} lg={3} xl={3}>
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

  const { movieDetails } = useSelector((state: IState) => ({
    movieDetails: MovieModel.get(params.id) as MovieModel
  }));

  const renderContent = () => {
    if (!movieDetails) {
      return <></>;
    }
    return (
      <div className="movie-details-container">
        <Container className="movie-grid-container">
          <Row className="title-container">
            <Header title={movieDetails.props.title} />
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
                src={`https://image.tmdb.org/t/p/original${movieDetails.props.poster_path}`}
              />
            </Col>
            <Col
              className="movie-text-details"
              xs={12}
              sm={12}
              md={9}
              lg={9}
              xl={9}>
              <Container>
                <Row style={{ marginTop: '0px' }}>
                  <Col>
                    <b>Overview:</b>
                    {movieDetails.props.overview}
                  </Col>
                </Row>
                <Row>
                  {renderDetail(
                    'Release Date',
                    movieDetails.props.release_date
                  )}
                  {renderDetail(
                    'Rating',
                    `${Math.round(movieDetails.props.vote_average * 10)}%`
                  )}
                </Row>
                <Row>
                  {renderDetail(
                    'Runtime',
                    `${movieDetails.props.runtime} minutes`
                  )}
                  {renderDetail('Tagline', movieDetails.props.tagline)}
                </Row>
                <Row>
                  {renderDetail(
                    'Genres',
                    movieDetails.props.genres.map(genre => genre.name).join(',')
                  )}
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="cast-title-container">
            <Header title="Cast" />
          </Row>
          <Row className="cast-container">{renderCast()}</Row>
        </Container>
      </div>
    );
  };

  return (
    <BasePage className="movie-details-page">
      <Async
        promise={promise}
        identifier={identifier}
        loader={<Loader />}
        error={<div>Error!</div>}
        content={renderContent()}
      />
    </BasePage>
  );
};

export default AboutUs;
