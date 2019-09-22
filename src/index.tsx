import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorBoundary } from './components/ReusableComponents/ErrorBoundary';
import { store } from './store';

const Home = React.lazy(() => import('./components/Home'));
const AboutUs = React.lazy(() => import('./components/AboutUs'));

library.add(faSearch);

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary errorComponent={<h1>Something went wrong</h1>}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/aboutus" component={AboutUs} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
