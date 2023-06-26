import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '../AuthForm/AuthForm';

export const Login = ({ setIsAuthorized }) => {
  const form = {
    name: 'login',
    greeting: 'Рады видеть!',
    button: 'Войти',
  };

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    setIsAuthorized(true);
    console.log('Login => handleSubmit => Я тут');
    navigate('/', { replace: false });
  };

  return (
    <AuthForm
      onSubmit={handleSubmit}
      form={form}
      errMessage="Что-то пошло не так..."
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
