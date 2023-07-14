import React, { useContext, useEffect } from 'react';
import './AuthForm.css';
import { Logo } from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { REGULAR_EMAIL } from '../../constants/regular';
import { CurrentErrorContext } from '../../contexts/CurrentErrorContext';
import { RessetErrorContext } from '../../contexts/RessetErrorContext';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const AuthForm = ({ onSubmit, form, children }) => {
  const initialForm = { name: '', email: '', password: '' };
  const { values, handleChange, errors, isValid, hasChanges, isOnBlur } =
    useFormWithValidation();
  //Подписка на контекст
  const isErrorMessage = useContext(CurrentErrorContext);
  const ressetError = useContext(RessetErrorContext);
  const isPreloader = useContext(IsPreloaderContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  useEffect(() => {
    ressetError();
  }, [values, ressetError]);

  return (
    <form
      className="form"
      name={`${form.name}-form`}
      onSubmit={handleSubmit}
    >
      <div className="form__top">
        <Logo parentClassName="form__logo" />
        <h1 className="form__greeting">{form.greeting}</h1>
      </div>
      <fieldset className="form__inputs">
        {form.name === 'register' && (
          <label className="form__lebel">
            Имя
            <input
              onBlur={handleChange}
              autoComplete="nickname"
              type="text"
              className={`form__input ${
                !isValid & isOnBlur.name ? 'form__input_invalid' : ''
              }`}
              id="name"
              value={values?.name || ''}
              onChange={handleChange}
              name="name"
              required
              minLength="2"
              maxLength="30"
              placeholder="Введите Имя"
              disabled={isPreloader}
            ></input>
            <span className="form__input-error">{errors.name}</span>
          </label>
        )}
        <label className="form__lebel">
          E-mail
          <input
            onBlur={handleChange}
            autoComplete="email"
            type="email"
            // className="form__input"
            className={`form__input ${
              !isValid & isOnBlur?.email ? 'form__input_invalid' : ''
            }`}
            id="email"
            value={values?.email || ''}
            onChange={handleChange}
            required
            name="email"
            pattern={REGULAR_EMAIL}
            maxLength="100"
            placeholder="Введите E-mail"
            disabled={isPreloader}
          ></input>
          <span className="form__input-error">{errors.email}</span>
        </label>
        <label className="form__lebel">
          Пароль
          <input
            onBlur={handleChange}
            autoComplete="current-password"
            type="password"
            className={`form__input ${
              !isValid & isOnBlur?.password ? 'form__input_invalid' : ''
            }`}
            id="password"
            value={values?.password || ''}
            onChange={handleChange}
            name="password"
            required
            minLength="8"
            maxLength="100"
            placeholder="Введите Пароль"
            disabled={isPreloader}
          ></input>
          <span className="form__input-error">{errors.password}</span>
        </label>
      </fieldset>
      <span className="form__error">{isErrorMessage}</span>
      <div className="form__buttons">
        <button
          type="submit"
          className="form__button"
          disabled={hasChanges(initialForm) || !isValid || isPreloader}
        >
          {form.button}
        </button>
        {children}
      </div>
    </form>
  );
};
