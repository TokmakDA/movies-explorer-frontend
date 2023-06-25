import React from 'react';
import './AuthButtons.css';
import { Link } from 'react-router-dom';

export const AuthButtons = () => {
  return (
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
};
