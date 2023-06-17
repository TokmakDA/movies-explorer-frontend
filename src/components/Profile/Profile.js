import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  const user = { name: 'Петруха', email: 'petrucha@mail.ru' };
  return (
    <div className="profile">
      <p className="profile__greeting">{`Привет, ${user.name}!`}</p>
      <ul className="profile__data">
      <li className="profile__wrapper">
          <p className="profile__column-name">Имя</p>
          <p className="profile__column-data">{user.name}</p>
        </li>
        {/* <hr className="line" /> */}
        <li className="profile__wrapper">
          <p className="profile__column-name">E-mail</p>
          <p className="profile__column-data">{user.email}</p>
        </li>
      </ul>
      <ul className="profile__links">
        <li className="profile__link">
          <Link className="profile__edit">Редактировать</Link>
        </li>
        <li className="profile__link">
          <Link className="profile__logout">Выйти из аккаунта</Link>
        </li>
      </ul>
    </div>
  );
}

export default Profile;
