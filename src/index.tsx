import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from './components/ReusableComponents/ErrorBoundary';
import { store } from './store';

library.add(faSearch);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary errorComponent={<h1>Something went wrong</h1>}>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              exact
              path="/"
              component={React.lazy(() => import('./components/Home'))}
            />
            <Route
              exact
              path="/movie/:id"
              component={React.lazy(() => import('./components/MovieDetails'))}
            />
          </Switch>
        </Suspense>
      </HashRouter>
      <ToastContainer />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
