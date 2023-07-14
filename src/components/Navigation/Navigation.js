import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';

export const Navigation = ({ themeColor, closeMenu }) => {
  const { isScreenLg } = useResize();
  const handleClassLink = ({ isActive }) => {
    return `nav__link nav__link_${
      isActive ? 'active' : 'unactive'
    } nav__link_theme_${themeColor}`;
  };

  return (
    <nav className="nav">
      <ul className="nav__links">
        {!isScreenLg && (
          <li>
            <NavLink
              to="/"
              className={handleClassLink}
              onClick={() => closeMenu?.()}
            >
              Главная
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="/movies"
            className={handleClassLink}
            onClick={() => closeMenu?.()}
          >
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/saved-movies"
            className={handleClassLink}
            onClick={() => closeMenu?.()}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <Link
        to="/profile"
        className={`nav__account-button nav__account-button_theme_${themeColor}`}
        onClick={() => closeMenu?.()}
      >
        <span
          className={`nav__button-icon nav__account-icon_theme_${themeColor}`}
        />
        Аккаунт
      </Link>
    </nav>
  );
};
