import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';
import './Header.css';

import { Menu } from '../Menu/Menu';
import { Navigation } from '../Navigation/Navigation';
import { AuthButtons } from '../AuthButtons/AuthButtons';

export const Header = ({ isAuthorized }) => {
  const { isScreenLg } = useResize();
  const location = useLocation();
  // стиль меню навигации взависимости от имени пути
  const themeColor = location.pathname !== '/' ? 'white' : 'gray';
  // стейт состояния меню
  const [isOpenMenu, setOpenMenu] = useState(false);
  // закрыть меню
  const closeMenu = useCallback(() => {
    setOpenMenu(false);
  }, [setOpenMenu]);
  const handleBurgerClick = () => {
    setOpenMenu(true);
  };

  // кнопка бургер меню
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
                isAuthorized={isAuthorized}
              />
            </>
          ) : (
            burger
          )
        ) : (
          <AuthButtons />
        )}
      </header>
      {!isScreenLg && isOpenMenu && (
        <Menu
          isOpen={isOpenMenu}
          closeMenu={closeMenu}
        >
          <Navigation
            themeColor={'white'}
            closeMenu={closeMenu}
          />
        </Menu>
      )}
    </>
  );
};
