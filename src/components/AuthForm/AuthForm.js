import React from 'react';
import './AuthForm.css';
import { Logo } from '../Logo/Logo';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { REGULAR_EMAIL } from '../../constants/regular';

export const AuthForm = ({ onSubmit, form, errMessage, children }) => {
  const INITIALS_FORM = { name: '', email: '', password: '' };
  const { values, handleChange, errors, isValid, hasChanges, handleOnBlur } =
    useFormWithValidation();

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
        <Logo parentClassName="form__logo" />
        <h1 className="form__greeting">{form.greeting}</h1>
      </div>
      <fieldset className="form__inputs">
        {form.name === 'register' && (
          <label className="form__lebel">
            Имя
            <input
              onBlur={handleOnBlur}
              autoComplete="nickname"
              type="text"
              className="form__input"
              id="name"
              value={values?.name || ''}
              onChange={handleChange}
              name="name"
              required
              minLength="2"
              maxLength="30"
              placeholder="Введите Имя"
            ></input>
            <span className="form__input-error">{errors.name}</span>
          </label>
        )}
        <label className="form__lebel">
          E-mail
          <input
            onBlur={handleOnBlur}
            autoComplete="email"
            type="email"
            className="form__input"
            id="email"
            value={values?.email || ''}
            onChange={handleChange}
            required={false}
            name="email"
            pattern={REGULAR_EMAIL}
            maxLength="100"
            placeholder="Введите E-mail"
          ></input>
          <span className="form__input-error">{errors.email}</span>
        </label>
        <label className="form__lebel">
          Пароль
          <input
            onBlur={handleOnBlur}
            autoComplete="current-password"
            type="password"
            className="form__input"
            id="password"
            value={values?.password || ''}
            onChange={handleChange}
            name="password"
            required={false}
            maxLength="100"
            placeholder="Введите Пароль"
          ></input>
          <span className="form__input-error">{errors.password}</span>
        </label>
        {/* <span className="form__error">{errMessage}</span> */}
      </fieldset>
      <span className="form__error">{errMessage}</span>

      <div className="form__buttons">
        <button
          type="submit"
          className="form__button"
          disabled={hasChanges(INITIALS_FORM) || !isValid}
        >
          {form.button}
        </button>
        {children}
      </div>
    </form>
  );
};
