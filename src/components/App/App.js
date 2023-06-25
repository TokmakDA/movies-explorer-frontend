import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

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
import ProtectedRoute from '../../utils/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

export const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const [isPreloader, setPreloader] = useState(false);
  const handleLogOut = (e) => {
    setIsAuthorized(false);
    navigate('/');
    localStorage.clear();
    setSearchMovies([]);
  };
  // Проверить localStorage
  const checkLocalStorage = useCallback((key) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
      return item;
    }
    console.log('checLocalStorage =>', key);
    return [];
  }, []);

  const [searchMovies, setSearchMovies] = useState(() =>
    checkLocalStorage('searhMovies'),
  );
  const [myMovies, setMyMovies] = useState(() => checkLocalStorage('myMovies'));
  // Состояние отслеживания изменения в карточках пользователя
  const [isСhangeMyMovies, setСhangeMyMovies] = useState(false);
  // Изменение состояния отслеживания изменения в карточках пользователя
  const changeMyMovies = () => {
    setСhangeMyMovies(true);
  };
  useEffect(() => {
    if (isСhangeMyMovies) {
      setMyMovies(() => checkLocalStorage('myMovies'));
      setСhangeMyMovies(false);
    }
  }, [isСhangeMyMovies, checkLocalStorage]);

  const findMovies = (e) => {
    e.preventDefault();
    console.log('Нажали на поиск');
    localStorage.setItem('searhMovies', JSON.stringify(NewMovies));
    setPreloader(true);
    setTimeout(() => {
      setPreloader(false);
      setSearchMovies(() => checkLocalStorage('searhMovies'));
    }, 1500);
  };

  useEffect(() => {
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
    localStorage.setItem('searhMovies', JSON.stringify(searchMovies));
  }, [myMovies, searchMovies]);

  return (
    <>
      {isPreloader && <Preloader />}
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
              element={
                <ProtectedRoute isAuthorized={isAuthorized}>
                  <Movies
                    findMovies={(e) => findMovies(e)}
                    movies={searchMovies}
                    changeMyMovies={changeMyMovies}
                  />
                </ProtectedRoute>
              }
            />
            {/* 3 Уровень вложенности */}
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isAuthorized={isAuthorized}>
                  <SavedMovies
                    movies={myMovies}
                    changeMyMovies={changeMyMovies}
                  />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* 2 Уровень вложенности */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthorized={isAuthorized}>
                <Profile handleLogOut={handleLogOut} />
              </ProtectedRoute>
            }
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
