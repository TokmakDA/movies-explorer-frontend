import React from 'react';
import './Student.css';

import { AboutMe } from '../AboutMe/AboutMe';
import { Portfolio } from '../Portfolio/Portfolio';

export const Student = () => {
  return (
    <section id="studen" className="content__section student">
      <h2 className="content__title">Студент</h2>
      <hr className="content__title-line" />
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </section>
  );
};
