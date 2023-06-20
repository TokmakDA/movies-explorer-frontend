import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';

function Navigation() {
  const { isScreenLg } = useResize();

  return (
    <nav className="nav">
      <ul className="nav__links">
        {!isScreenLg && (
          <li>
            <Link className="nav__link nav__link_active">Главная</Link>
          </li>
        )}
        <li>
          <Link className="nav__link nav__link_active">Фильмы</Link>
        </li>
        <li>
          <Link className="nav__link nav__link_unactive">
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link className="nav__account-button">
        <span className="nav__button-icon" />
        Аккаунт
      </Link>
    </nav>
  );
}

export default Navigation;
