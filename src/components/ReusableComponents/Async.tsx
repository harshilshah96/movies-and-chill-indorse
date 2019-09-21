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
