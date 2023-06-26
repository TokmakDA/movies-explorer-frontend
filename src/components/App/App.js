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
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import { Preloader } from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export const App = () => {
  const navigate = useNavigate();
  const [isAuthorized, setAuthorized] = useState(false);
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState(null);
  const [isPreloader, setPreloader] = useState(false);

  const handleLogOut = (e) => {
    setAuthorized(false);
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

  // Обновление данных пользователя
  const cbUpdateUser = async (userData) => {
    setPreloader(true);
    try {
      const user = await mainApi.patchUserMe(userData);
      console.log('cbUpdateUser => user', user);
      setCurrentUser(user.data);
      return;
    } catch (err) {
      console.log('cbUpdateUser => err', err);
    } finally {
      setPreloader(false);
    }
  };

  const TESTdata = {
    email: 'test@test.com',
    password: 'test@test.com',
  };
  const TESTNewData = {
    name: 'test@test.by',
    email: 'test@test.by',
    password: 'test@test.by',
  };
  // Авторизация
  const cbSignIn = async (userData) => {
    setPreloader(true);
    try {
      const user = await mainApi.postSignin(userData);
      console.log('cbSignIn => user', user);
      setCurrentUser(user.data);
      navigate('/movies');
      setAuthorized(true);
      return;
    } catch (err) {
      console.log('cbSignIn => err', err);
      navigate('/signin');
    } finally {
      setPreloader(false);
    }
  };
  // Выход
  const cbSignOut = async () => {
    setPreloader(true);
    try {
      const res = await mainApi.getSignout();
      setAuthorized(false);
      localStorage.clear();
      setCurrentUser(null);
      setSearchMovies([]);
      console.log('cbSignOut => res', res);
    } catch (err) {
      console.log('cbSignOut => err', err);
    } finally {
      setPreloader(false);
      navigate('/');
    }
  };

  // Регистрация
  const cbSignUp = async (NewData) => {
    setPreloader(true);
    try {
      const res = await mainApi.postSignup(NewData);
      navigate('/signin');
      console.log('cbSignUp => res', res);
    } catch (err) {
      console.log('cbSignUp => err', err);
    } finally {
      setPreloader(false);
    }
  };

  const getInitial = useCallback(async () => {
    setPreloader(true);
    try {
      const initialsData = await mainApi.getInitialsData();
      if (initialsData) {
        console.log('getInitial => initialsData', initialsData);
        setAuthorized(true);
        setCurrentUser(initialsData[0].data);
        // setCurrentCards(initialsData[1].data);
        // navigate('/movies');
      }
    } catch (err) {
      console.log('getInitial => err', err);
      setAuthorized(false);
    } finally {
      setPreloader(false);
    }
  }, []);

  useEffect(() => {
    getInitial();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                <Profile
                  onSignOut={cbSignOut}
                  onUpdateUser={(userData) => cbUpdateUser(userData)}
                />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* 1 Уровень вложенности */}
        <Route
          path="/signup"
          element={<Register onSignUp={(userData) => cbSignUp(userData)}/>}
        />
        {/* 1 Уровень вложенности */}
        <Route
          path="/signin"
          element={<Login onSingIn={(userData) => cbSignIn(userData)} />}
        />
        {/* 1 Уровень вложенности */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
};
