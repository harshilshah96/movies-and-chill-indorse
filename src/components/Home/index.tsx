import * as React from 'react';
import { BasePage } from '../ReusableComponents/BasePage';
import SearchBar from './SearchBar';
import { MovieList } from './MovieList';
import { RouteComponentProps } from 'react-router';
import { parse } from 'query-string';
import { MovieListModel } from '../../Models/MovieListModel';
import { savePageDetails } from '../../actions/pageActions';

const Home = (props: RouteComponentProps) => {
  const {
    location: { search }
  } = props;
  const queryParams = parse(search);

  const [showOtherLists, setShowOtherLists] = React.useState(true);

  const resetDetails = () => {
    savePageDetails(0, 0);
    MovieListModel.deleteAll();
  };

  React.useEffect(() => {
    if (!queryParams.search) {
      setShowOtherLists(true);
      resetDetails();
      return;
    }
    setShowOtherLists(false);
    resetDetails();
  }, [search]);

  return (
    <BasePage className="home-page">
      <SearchBar />
      {showOtherLists ? (
        <>
          <MovieList type="popular" />
          <MovieList type="top_rated" />
          <MovieList type="now_playing" />
        </>
      ) : (
        <MovieList search={queryParams.search as string} />
      )}
    </BasePage>
  );
};

export default Home;
