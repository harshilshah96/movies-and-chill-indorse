import * as React from 'react';
import './header.scss';

export interface IHeaderProps {
  title: string;
  className?: string;
}

export const Header = (props: IHeaderProps) => {
  const { className, title } = props;

  return (
    <div className="header-title-container">
      <h2 className="header-title">{title}</h2>
    </div>
  );
};
