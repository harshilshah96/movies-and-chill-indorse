import * as React from 'react';
import { NavBar } from '../Nav';

export const BasePage = ({
  className,
  style,
  children
}: {
  className?: string;
  children: JSX.Element | JSX.Element[] | string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`page ${className || ``}`}
    style={{
      ...styles.basePage,
      ...style
    }}>
    <NavBar />
    <div className="layout-children">{children}</div>
  </div>
);

const styles = {
  basePage: {
    display: 'flex',
    flexDirection: 'column' as any
  }
};
