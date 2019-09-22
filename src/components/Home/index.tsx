import * as React from 'react';
import { BasePage } from '../ReusableComponents/BasePage';
import SearchBar from './SearchBar';
import { MovieList } from './MovieList';

const Home = () => (
  <BasePage className="home-page">
    <SearchBar />
    <MovieList type="popular" />
    <MovieList type="top_rated" />
    <MovieList type="now_playing" />
  </BasePage>
);

export default Home;
