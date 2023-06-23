import React from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

import { AuthForm } from '../AuthForm/AuthForm';

export const Register = ({}) => {
  const navigate = useNavigate();

  const form = {
    name: 'register',
    greeting: 'Добро пожаловать!',
    button: 'Зарегистрироваться',
  };

  const handleSubmit = () => {
    console.log('Register => handleSubmit => Я тут');
    return navigate('/signin');
  };
  return (
    <AuthForm
      onSubmit={handleSubmit}
      form={form}
      errMessage="Что-то пошло не так..."
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
