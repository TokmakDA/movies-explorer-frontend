import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="content__not-found not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <Link
        className="not-found__back"
        to="/"
      >
        Назад
      </Link>
    </section>
  );
};
