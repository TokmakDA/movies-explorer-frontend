import React, { useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { NotFound } from '../NotFound/NotFound';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { NewMovies } from '../../data/NewMovies';

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const findMovies = (e) => {
    e.preventDefault();
    console.log('Нажали на поиск')
    localStorage.setItem('searhMovies', JSON.stringify(NewMovies));
  };

  return (
    <>
      <Routes>
        {/* 1 Уровень вложенности */}
        <Route
          path="/"
          element={
            <>
              <Header isAuthorized={isAuthorized} />
              <Outlet />
            </>
          }
        >
          {/* 2 Уровень вложенности */}
          <Route
            element={
              <>
                <Outlet />
                <Footer />
              </>
            }
          >
            {/* 3 Уровень вложенности */}
            <Route
              index
              element={<Main />}
            />
            {/* 3 Уровень вложенности */}
            <Route
              path="/movies"
              element={<Movies findMovies={(e)=>findMovies(e)} />}
            />
            {/* 3 Уровень вложенности */}
            <Route
              path="/saved-movies"
              element={<SavedMovies />}
            />
          </Route>
          {/* 2 Уровень вложенности */}
          <Route
            path="/profile"
            element={<Profile setIsAuthorized={setIsAuthorized} />}
          />
        </Route>
        {/* 1 Уровень вложенности */}
        <Route
          path="/signup"
          element={<Register />}
        />
        {/* 1 Уровень вложенности */}
        <Route
          path="/signin"
          element={<Login setIsAuthorized={setIsAuthorized} />}
        />
        {/* 1 Уровень вложенности */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
};
