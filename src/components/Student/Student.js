import React from 'react';
import './Student.css';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Student() {
  return (
    <section className="student">
      <h2 className="student__title">Студент</h2>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </section>
  );
}

export default Student;
