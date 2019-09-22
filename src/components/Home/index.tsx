import * as React from 'react';
import { BasePage } from '../ReusableComponents/BasePage';
import { Button } from 'react-bootstrap';
import SearchBar from './SearchBar';

const Home = () => (
  <BasePage className="home-page">
    <SearchBar />
  </BasePage>
);

export default Home;
