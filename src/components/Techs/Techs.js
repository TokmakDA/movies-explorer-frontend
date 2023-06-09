import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="content__section techs">
      <h2 className="content__title">Технологии</h2>
      <hr className="content__title-line" />
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__name">HTML</li>
          <li className="techs__name">CSS</li>
          <li className="techs__name">JS</li>
          <li className="techs__name">React</li>
          <li className="techs__name">Git</li>
          <li className="techs__name">Express.js</li>
          <li className="techs__name">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
