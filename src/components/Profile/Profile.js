import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { useForm } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export const Profile = ({ onSignOut, onUpdateUser }) => {
  const { values, handleChange, setValues } = useForm();
  // Подписка на контекст currentUser
  const currentUser = useContext(CurrentUserContext);

  const [isEditOpen, setEditOpen] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    setValues({
      name: currentUser?.name,
      email: currentUser?.email,
    });
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);

    console.log('Profile => handleSubmit => values', values);
  };

  const switchEditProfile = () => {
    setEditOpen(!isEditOpen);
  };

  const elementButtonSubmit = (
    <button
      type="submit"
      className="profile__submit-button"
      //Временная конструкция
      disabled={errMessage ? true : false}
    >
      Сохранить
    </button>
  );
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
            className="profile__input"
            value={values?.name || ''}
            name="name"
            disabled={!isEditOpen || errMessage ? true : false}
            onChange={handleChange}
            placeholder="Введите Имя"
          />
        </label>
        <hr className="profile__line" />
        <label className="profile__label">
          E-mail
          <input
            className="profile__input"
            value={values?.email || ''}
            name="email"
            disabled={!isEditOpen || errMessage ? true : false}
            onChange={handleChange}
            placeholder="Введите E-mail"
          />
        </label>
      </fieldset>
      <span className="profile__error">{errMessage || ''}</span>
      {!isEditOpen ? elementDefaulButtons : elementButtonSubmit}
    </form>
  );
};
