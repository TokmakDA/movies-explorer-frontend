import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <div className="student__portfolio portfolio__container">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li>
          <Link className="portfolio__link">
            <p className="portfolio__name-link">Статичный сайт</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
        <hr className="portfolio__line" />
        <li>
          <Link className="portfolio__link">
            <p className="portfolio__name-link">Адаптивный сайт</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
        <hr className="portfolio__line" />
        <li>
          <Link className="portfolio__link">
            <p className="portfolio__name-link">Одностраничное приложение</p>
            <p className="portfolio__name-link">↗</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
