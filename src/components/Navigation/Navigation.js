import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';

export const Navigation = ({ themeColor }) => {
  const { isScreenLg } = useResize();
  const location = useLocation();

  return (
    <nav className="nav">
      <ul className="nav__links">
        {!isScreenLg && (
          <li>
            <Link
              to="/"
              className="nav__link nav__link_active"
            >
              Главная
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/movies"
            className={`nav__link nav__link_active nav__link_theme_${themeColor}`}
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/saved-movies"
            className={`nav__link nav__link_active nav__link_theme_${themeColor}`}
          >
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link
        to="/profile"
        className={`nav__account-button nav__account-button_theme_${themeColor}`}
      >
        <span
          className={`nav__button-icon nav__account-icon_theme_${themeColor}`}
        />
        Аккаунт
      </Link>
    </nav>
  );
};
