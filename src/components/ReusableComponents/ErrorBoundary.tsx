import * as React from 'react';
import { toast } from 'react-toastify';

export class ErrorBoundary extends React.PureComponent<
  { errorComponent: JSX.Element | JSX.Element[] | string },
  { hasError: boolean }
> {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    toast('ERROR:' + error, { type: 'error' });
    console.log('>>error', error);
  }

  render() {
    const { hasError } = this.state;
    const { children, errorComponent } = this.props;
    if (hasError) {
      return { errorComponent };
    } else {
      return children;
    }
  }
}
