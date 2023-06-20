import React, { useEffect, useState } from 'react';
import './AuthForm.css';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

function AuthForm({
  isLoggedIn,
  onSubmit,
  form,
  errMessage,
  isLoading,
  children,
}) {
  const [currentButton, setButton] = useState(form.button);
  useEffect(
    () => (isLoading ? setButton(form.loadingButton) : setButton(form.button)),
    [isLoading, form],
  );

  const { values, handleChange } = useForm();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <div className="form">
      <div className="form__top">
        <Link className="logo" />
        <p className="form__greeting">{form.greeting}</p>
      </div>
      <form
        className="form__wrapper"
        name={`${form.name}-form`}
        onSubmit={handleSubmit}
      >
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
            ></input>
          </label>
          <span className="form__error">{errMessage}</span>
        </fieldset>
        <button
          type="submit"
          className="form__button"
        >
          {currentButton}
        </button>
      </form>
      {children}
    </div>
  );
}

export default AuthForm;
