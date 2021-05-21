import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

import styles from './header.module.css';

export default function Header(): JSX.Element {
  return (
    <Navbar className={styles.header}>
      <Navbar.Brand href="/">
        <img src="/globe.png" alt="globe icon" />
        Countries Finder
      </Navbar.Brand>
    </Navbar>
  );
}
