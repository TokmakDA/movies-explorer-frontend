import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Menu({ isOpen }) {
  return (
    <section className={`content__menu menu ${isOpen && 'menu_is-opened'}`}>
      <div className="menu__container">
        <Link className="menu__exit" />
        <Navigation />
      </div>
    </section>
  );
}

export default Menu;
