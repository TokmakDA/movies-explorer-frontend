import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

import { AuthForm } from '../AuthForm/AuthForm';

export const Login = ({ isLoggedIn, onLogin, isLoading }) => {
  const form = {
    name: 'login',
    greeting: 'Рады видеть!',
    button: 'Войти',
  };

  return (
    <AuthForm
      isLoggedIn={isLoggedIn}
      onSubmit={onLogin}
      form={form}
      isLoading={isLoading}
      errMessage="Что-то пошло не так..."
    >
      <div className="form__link-wrapper">
        <p className="form__link-preface">Ещё не зарегистрированы?</p>
        <Link
          className="form__link"
          to="../sign-up"
        >
          Регистрация
        </Link>
      </div>
    </AuthForm>
  );
};
