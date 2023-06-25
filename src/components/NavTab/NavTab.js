import React from 'react';
import './NavTab.css';
import AnchorLink from 'react-anchor-link-smooth-scroll';

export const NavTab = () => {
  return (
    <nav className="content__nav-tab nav-tab">
      <AnchorLink
        href="#about-project"
        className="nav-tab__link"
      >
        О проекте
      </AnchorLink>
      <AnchorLink
        href="#techs"
        className="nav-tab__link"
      >
        Технологии
      </AnchorLink>

      <AnchorLink
        href="#studen"
        className="nav-tab__link"
      >
        Студент
      </AnchorLink>
    </nav>
  );
};
