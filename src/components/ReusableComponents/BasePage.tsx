import * as React from 'react';
import { NavBar } from '../Nav';
import './basepage.scss';
/**
 * Since we're using Route level code splitting, it makes sense to make a Base page that will be surrounding
 * all the pages that a Route renders for a quicker way to add more pages
 */

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

const styles: { [key: string]: React.CSSProperties } = {
  basePage: {
    display: 'flex',
    flexDirection: 'column' as any,
    backgroundColor: '#f5f5f5'
  }
};
