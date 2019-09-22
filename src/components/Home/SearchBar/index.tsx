import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import { Form } from 'react-bootstrap';
import { parse } from 'query-string';

export const SearchBar = (props: RouteComponentProps) => {
  const [showSearchBar, setSearchBarVisibility] = React.useState(false);

  const handleBarVisibility = () => {
    setSearchBarVisibility(!showSearchBar);
  };

  const [search, setSearch] = React.useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      history: { push }
    } = props;
    if (!search.trim()) {
      return;
    }
    push(`?search=${search}`);
  };

  return (
    <div className="search-bar-container">
      <div onClick={handleBarVisibility} className="search-icon-container">
        <FontAwesomeIcon size="2x" icon="search" />
      </div>
      <Form onSubmit={handleSearch}>
        <Form.Control
          onChange={e => setSearch(e.currentTarget.value)}
          placeholder="Enter movie title"
          className={`search-query-input search-bar-visible-${showSearchBar}`}
        />
      </Form>
    </div>
  );
};

export default withRouter(SearchBar);
