import * as React from 'react';
import './nav.scss';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <div className="nav-bar-container">
    <Link to="/">
      <div className="logo-container">Movies & Chill</div>
    </Link>
  </div>
);
