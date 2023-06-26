import React from 'react';
import './Main.css';

import { Promo } from '../Promo/Promo';
import { NavTab } from '../NavTab/NavTab';
import { AboutProject } from '../AboutProject/AboutProject';
import { Techs } from '../Techs/Techs';
import { Student } from '../Student/Student';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <Student />
      <Outlet/>
    </main>
  );
};
