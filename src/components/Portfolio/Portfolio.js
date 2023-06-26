import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

export const Portfolio = () => {
  return (
    <div className="student__portfolio portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__link-wrapper">
          <Link
            className="portfolio__link"
            to="https://github.com/TokmakDA/how-to-learn"
            target="_blank"
          >
            <p className="portfolio__name-link">Статичный сайт</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link
            className="portfolio__link"
            to="https://tokmakda.github.io/russian-travel/index.html"
            target="_blank"
          >
            <p className="portfolio__name-link">Адаптивный сайт</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
        <li className="portfolio__link-wrapper">
          <Link
            className="portfolio__link"
            to="https://tokmak-da.mesto.nomoredomains.monster"
            target="_blank"
          >
            <p className="portfolio__name-link">Одностраничное приложение</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};
