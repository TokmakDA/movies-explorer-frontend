import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { AuthForm } from '../AuthForm/AuthForm';

export const Register = ({ isLoggedIn, onLogin, isLoading }) => {
  const form = {
    name: 'register',
    greeting: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
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
        <p className="form__link-preface">Уже зарегистрированы?</p>
        <Link
          className="form__link"
          to="../sign-in"
        >
          Войти
        </Link>
      </div>
    </AuthForm>
  );
};
