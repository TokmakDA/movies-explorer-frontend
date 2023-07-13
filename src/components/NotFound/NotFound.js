import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="content__not-found not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__message">Страница не найдена</p>
      </div>
      <button
        className="not-found__button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </section>
  );
};
