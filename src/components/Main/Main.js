import React from 'react';
import './Main.css';

import { Promo } from '../Promo/Promo';
import { NavTab } from '../NavTab/NavTab';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { Student } from '../Student/Student';

export const Main = () => {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Student />
    </main>
  );
};
