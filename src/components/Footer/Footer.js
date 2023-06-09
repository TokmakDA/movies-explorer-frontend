import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <hr className="footer__line" />
      <div className="footer__wrapper">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li>
            <Link className="footer__link">Яндекс.Практикум</Link>
          </li>
          <li>
            <Link className="footer__link">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
