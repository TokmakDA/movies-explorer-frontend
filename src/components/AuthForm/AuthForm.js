import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const AuthForm = ({ onSubmit, form, errMessage, children }) => {
  const { values, handleChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form
      className="form"
      name={`${form.name}-form`}
      onSubmit={handleSubmit}
    >
      <div className="form__top">
        <Link
          to="/"
          className="form__logo"
        />
        <h1 className="form__greeting">{form.greeting}</h1>
      </div>
      <fieldset className="form__inputs">
        {form.name === 'register' && (
          <label className="form__lebel">
            Имя
            <input
              autoComplete="nickname"
              type="text"
              className="form__input"
              id="name"
              value={values?.name || ''}
              onChange={handleChange}
              name="name"
              required
              maxLength="100"
              placeholder="Введите Имя"
            ></input>
          </label>
        )}
        <label className="form__lebel">
          E-mail
          <input
            autoComplete="email"
            type="email"
            className="form__input"
            id="email"
            value={values?.email || ''}
            onChange={handleChange}
            name="email"
            required
            maxLength="100"
            placeholder="Введите E-mail"
          ></input>
        </label>
        <label className="form__lebel">
          Пароль
          <input
            autoComplete="current-password"
            type="password"
            className="form__input"
            id="password"
            value={values?.password || ''}
            onChange={handleChange}
            name="password"
            required
            maxLength="100"
            placeholder="Введите Пароль"
          ></input>
        </label>
        <span className="form__error">{errMessage}</span>
      </fieldset>
      <div className="form__buttons">
        <button
          type="submit"
          className="form__button"
        >
          {form.button}
        </button>
        {children}
      </div>
    </form>
  );
};
