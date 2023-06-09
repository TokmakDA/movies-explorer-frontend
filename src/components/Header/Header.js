import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  const isLoading = false;

  const loginContainer = (
    <nav className="header__login-container">
      <Link className="header__register-link">Регистрация</Link>
      <Link className="header__login-button">Войти</Link>
    </nav>
  );

  const accountButton = (
    <Link className="header__account-button">
      <span className="header__button-icon" />
      Аккаунт
    </Link>
  );

  return (
    <header className={`header header_color_${isLoading ? "white" : "gray"}`}>
      <Link className="header__logo" />
      {isLoading ? (
        <>
          <Navigation /> {accountButton}
        </>
      ) : (
        loginContainer
      )}
    </header>
  );
}

export default Header;
