import React from 'react';
import { Link } from 'react-router-dom';
import { useResize } from '../../hooks/useResize';
import './Header.css';

import { Navigation } from '../Navigation/Navigation';

export const Header = () => {
  const { isScreenLg } = useResize();
  // const [isUserBarOpen, setUserBarOpen] = useState(false);

  const isLoading = true;

  const loginContainer = (
    <nav className="header__login-container">
      <Link className="header__register-link">Регистрация</Link>
      <Link className="header__login-button">Войти</Link>
    </nav>
  );

  const burger = <Link className="header__burger"></Link>;

  return (
    <header className={`header header_color_${isLoading ? 'white' : 'gray'}`}>
      <Link className="header__logo" />
      {isLoading ? (
        isScreenLg ? (
          <>
            <Navigation />
          </>
        ) : (
          burger
        )
      ) : (
        loginContainer
      )}
    </header>
  );
};
