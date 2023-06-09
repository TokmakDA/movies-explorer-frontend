import React from 'react';
import './Student.css';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Student() {
  return (
    <section className="content student">
      <h2 className="content__title">Студент</h2>
      <hr className="content__title-line" />
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </section>
  );
}

export default Student;
