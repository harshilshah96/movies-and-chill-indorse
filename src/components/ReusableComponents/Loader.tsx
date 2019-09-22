import * as React from 'react';
import './loader.scss';

export interface ILoaderProps {
  className?: string;
  width?: string;
}

export const Loader = (props: ILoaderProps) => (
  <div className={`loader-container ${props.className}`}>
    <img className="loader-img" src={require('../../assets/loader.svg')} />
  </div>
);
