import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';
import './Header.css';

import { Menu } from '../Menu/Menu';
import { Navigation } from '../Navigation/Navigation';

export const Header = ({ isAuthorized }) => {
  const { isScreenLg } = useResize();
  const location = useLocation();
  const themeColor = location.pathname !== '/' ? 'white' : 'gray';
  const [isOpenMenu, setOpenMenu] = useState(false);

  const handleBurgerClick = () => {
    setOpenMenu(true);
  };
  const loginContainer = (
    <nav className="header__buttons">
      <Link
        to="/signup"
        className="header__register-button"
      >
        Регистрация
      </Link>
      <Link
        to="/signin"
        className="header__login-button"
      >
        Войти
      </Link>
    </nav>
  );

  const burger = (
    <Link
      className={`header__burger header__burger_theme_${themeColor}`}
      onClick={() => handleBurgerClick()}
    ></Link>
  );

  return (
    <>
      <header className={`header header_color_${themeColor}`}>
        <Link
          to="/"
          className="header__logo"
        />
        {isAuthorized ? (
          isScreenLg ? (
            <>
              <Navigation
                themeColor={themeColor}
                // setOpen={setOpenMenu}
              />
            </>
          ) : (
            burger
          )
        ) : (
          loginContainer
        )}
      </header>
      {!isScreenLg && isOpenMenu && (
        <Menu
          isOpen={isOpenMenu}
          setOpen={setOpenMenu}
        />
      )}
    </>
  );
};
