import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {

  const elementHome = (<Link className="header__link header__Link_active">Главная</Link>)

  return (
    <nav className="header__navigation">
      <Link className="header__link header__Link_active">Фильмы</Link>
      <Link className="header__link header__Link_unactive">
        Сохранённые фильмы
      </Link>
    </nav>
  );
}

export default Navigation;
