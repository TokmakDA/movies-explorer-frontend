import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <nav className="content__nav-tab nav-tab">
      <Link className="nav-tab__link">О проекте</Link>
      <Link className="nav-tab__link">Технологии</Link>
      <Link className="nav-tab__link">Студент</Link>
    </nav>
  );
}

export default NavTab;
