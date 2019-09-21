import * as React from 'react';
import { executePromiseAction } from '../../actions/loadingActions';
import { IState } from '../../../interfaces';
import { connect, useSelector } from 'react-redux';
import { LOADING_STATE } from '../../reducers/loadingReducers';

export interface IAsyncState {
  isLoading?: boolean;
  hasError?: boolean;
}

interface IAsyncStoreProps {
  loadingState?: IAsyncState;
}

interface IASyncProps extends IAsyncStoreProps {
  promise: (...args: any[]) => any;
  identifier?: string;
  content: JSX.Element | JSX.Element[];
  error: JSX.Element | JSX.Element[];
  loader: JSX.Element | JSX.Element[];
  initialState?: IAsyncState;
}

/** This component is used to handle Async tasks, it takes in the following props:
 * promise: The API call promise which will fetch the data.
 * identifier: identifier of Redux.
 * content: The content to be displayed when the promise is resolved.
 * error: The error message to be shown if the promise fails.
 * loader: The loader to be shown while the promise is executing.
 */

export const Async = ({
  loader,
  content,
  error,
  identifier,
  promise,
  initialState
}: IASyncProps) => {
  const executePromise = () => {
    if (promise instanceof Function) {
      executePromiseAction(promise(), identifier);
    }
  };

  const { hasError, isLoading }: IAsyncState = useSelector(
    (state: IState) =>
      state.loading.get(identifier) || initialState || LOADING_STATE
  );

  React.useEffect(() => {
    executePromise();
  }, []);

  if (isLoading && loader) {
    return <>{loader}</>;
  }
  if (!isLoading && !hasError) {
    return <>{content}</>;
  }
  if (hasError && error) {
    return <>{error}</>;
  }
};
