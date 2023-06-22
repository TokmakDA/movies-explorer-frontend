import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const Profile = () => {
  const { values, handleChange, setValues } = useForm();
  const [currentUser, setCurrentUser] = useState({
    name: 'Петруха',
    email: 'petrucha@mail.ru',
  });
  const [isEditOpen, setEditOpen] = useState(false);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    setValues({
      name: currentUser?.name,
      email: currentUser?.email,
    });
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentUser(values);
    //Временная конструкция
    setErrMessage('При обновлении профиля произошла ошибка.');
  };

  const switchEditProfile = () => {
    setEditOpen(!isEditOpen);
  };
  const elementButtonSubmit = (
    <button
      type="submit"
      className="profile__submit-button"
      placeholder="Искать"
      name="searchMovie"
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
        placeholder="Искать"
        name="searchMovie"
        onClick={switchEditProfile}
      >
        Редактировать
      </button>
      <button className="profile__button profile__button_logout">
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
            disabled={!isEditOpen ? true : false}
            onChange={handleChange}
          />
        </label>
        <hr className="profile__line" />
        <label className="profile__label">
          E-mail
          <input
            className="profile__input"
            value={values?.email || ''}
            name="email"
            disabled={!isEditOpen ? true : false}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <span className="profile__error">{errMessage}</span>
      {!isEditOpen ? elementDefaulButtons : elementButtonSubmit}
    </form>
  );
};
