import React, { useEffect } from 'react';
import { Routes } from 'react-router-dom';

import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { NotFound } from '../NotFound/NotFound';
import { Menu } from '../Menu/Menu';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Preloader } from '../Preloader/Preloader';
import { NewMovies } from '../../data/NewMovies';

export const App = () => {
  const findMovies = (e) => {
    e.preventDefault();
    localStorage.setItem('searhMovies', JSON.stringify(NewMovies));
    alert('FindClick');
  };

  return (
    <>
      <Routes></Routes>
      <Header />
      {/* <Main /> */}
      <Movies findMovies={findMovies} />
      {/* <SavedMovies /> */}
      {/* <Footer /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Profile /> */}
      {/* <NotFound /> */}
      {/* <Menu /> */}
    </>
  );
};
