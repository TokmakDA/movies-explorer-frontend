import React from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';

export const Navigation = ({ themeColor, setOpen }) => {
  const { isScreenLg } = useResize();
  const location = useLocation();
  const checkLink = (patch) => {
    return location.pathname === patch ? 'active' : 'unactive';
  };

  return (
    <nav
      className="nav"
      onClick={() => setOpen?.(false)}
    >
      <ul className="nav__links">
        {!isScreenLg && (
          <li>
            <Link
              to="/"
              className={`nav__link nav__link_${checkLink(
                '/',
              )} nav__link_theme_${themeColor}`}
            >
              Главная
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/movies"
            className={`nav__link nav__link_${checkLink(
              '/movies',
            )} nav__link_theme_${themeColor}`}
          >
            Фильмы
          </Link>
        </li>
        <li>
          <Link
            to="/saved-movies"
            className={`nav__link nav__link_${checkLink(
              '/saved-movies',
            )} nav__link_theme_${themeColor}`}
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
