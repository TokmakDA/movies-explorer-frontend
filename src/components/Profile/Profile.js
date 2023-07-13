import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { REGULAR_EMAIL } from '../../constants/regular';
import { CurrentErrorContext } from '../../contexts/CurrentErrorContext';
import { RessetErrorContext } from '../../contexts/RessetErrorContext';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const Profile = ({ onSignOut, onUpdateUser }) => {
  // // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const isErrorMessage = useContext(CurrentErrorContext);
  const ressetError = useContext(RessetErrorContext);
  const isPreloader = useContext(IsPreloaderContext);

  const { values, handleChange, setValues, errors, isValid, hasChanges } =
    useFormWithValidation();

  const [isEditOpen, setEditOpen] = useState(false);

  useEffect(() => {
    setValues({
      name: currentUser?.name,
      email: currentUser?.email,
    });
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  const switchEditProfile = () => {
    setEditOpen(!isEditOpen);
  };

  const elementDefaulButtons = (
    <div className="profile__buttons">
      <button
        type="button"
        className="profile__button profile__button_edit"
        onClick={switchEditProfile}
      >
        Редактировать
      </button>
      <button
        onClick={(e) => onSignOut(e)}
        className="profile__button profile__button_logout"
      >
        Выйти из аккаунта
      </button>
    </div>
  );
  const elementButtonSubmit = (
    <button
      type="submit"
      className="profile__submit-button"
      disabled={hasChanges(currentUser) || !isValid || isPreloader}
    >
      Сохранить
    </button>
  );

  useEffect(() => {
    ressetError();
  }, [values, ressetError]);

  return (
    <form
      className="profile"
      onSubmit={handleSubmit}
    >
      <h1 className="profile__greeting">{`Привет, ${currentUser?.name}!`}</h1>
      <fieldset className="profile__inputs">
        <label className="profile__label">
          Имя
          <input
            // onBlur={handleOnBlur}
            className="profile__input"
            value={values?.name || ''}
            name="name"
            type="text"
            disabled={!isEditOpen || isPreloader ? true : false}
            onChange={(e) => handleChange(e)}
            placeholder="Введите Имя"
            required
            maxLength={30}
            minLength={2}
          />
          <span className="profile__input-error">{errors.name}</span>
        </label>
        <hr className="profile__line" />
        <label className="profile__label">
          E-mail
          <input
            // onBlur={handleOnBlur}
            className="profile__input"
            value={values?.email || ''}
            pattern={REGULAR_EMAIL}
            name="email"
            type="email"
            disabled={!isEditOpen || isPreloader ? true : false}
            onChange={handleChange}
            placeholder="Введите E-mail"
            required
          />
          <span className="profile__input-error">{errors.email}</span>
        </label>
      </fieldset>
      <span className="profile__error">{isErrorMessage || ''}</span>
      {!isEditOpen ? elementDefaulButtons : elementButtonSubmit}
    </form>
  );
};
