import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

import { AuthForm } from '../AuthForm/AuthForm';

export const Register = ({ onSignUp }) => {
  const form = {
    name: 'register',
    greeting: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
  };

  return (
    <AuthForm
      onSubmit={onSignUp}
      form={form}
      errMessage={false}
    >
      <div className="form__link-wrapper">
        <p className="form__link-preface">Уже зарегистрированы?</p>
        <Link
          className="form__link"
          to="/signin"
        >
          Войти
        </Link>
      </div>
    </AuthForm>
  );
};
