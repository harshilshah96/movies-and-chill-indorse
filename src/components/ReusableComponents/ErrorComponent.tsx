import * as React from 'react';
import './errorcomponent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IErrorComponentProps {
  className?: string;
}

export const ErrorComponent = () => (
  <div className="error-component-container">
    <FontAwesomeIcon icon="exclamation-triangle" size="2x" color="red" />
    <div>Something went Wrong. Please refresh to try again</div>
  </div>
);
