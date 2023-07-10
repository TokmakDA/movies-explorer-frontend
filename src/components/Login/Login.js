import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

import { AuthForm } from '../AuthForm/AuthForm';

export const Login = ({ onSingIn, errMessage }) => {
  const form = {
    name: 'login',
    greeting: 'Рады видеть!',
    button: 'Войти',
  };

  return (
    <AuthForm
      onSubmit={onSingIn}
      form={form}
      errMessage={errMessage}
    >
      <div className="form__link-wrapper">
        <p className="form__link-preface">Ещё не зарегистрированы?</p>
        <Link
          className="form__link"
          to="/signup"
        >
          Регистрация
        </Link>
      </div>
    </AuthForm>
  );
};
