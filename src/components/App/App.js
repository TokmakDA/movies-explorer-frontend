import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Profile } from '../Profile/Profile';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { NotFound } from '../NotFound/NotFound';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import { Preloader } from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { handlingCards } from '../../utils/handlingCards';
import { SearchMovies } from '../SearchMovies/SearchMovies';
import { ErrorContext } from '../../contexts/ErrorContext';
import { RessetErrorContext } from '../../contexts/RessetErrorContext';

export const App = () => {
  const navigate = useNavigate();
  const [isAuthorized, setAuthorized] = useState(false);
  // Стейт данных пользователя
  const [currentUser, setCurrentUser] = useState(null);
  const [isPreloader, setPreloader] = useState(false);
  // Проверить localStorage
  const checkLocalStorage = useCallback((key) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
      return item;
    }
    return [];
  }, []);

  // стейт Ошибки
  const [isErrorMessage, setErrorMessage] = useState(null);
  const ressetError = useCallback(() => {
    console.log('ressetError =>', isErrorMessage);
    setErrorMessage(null);
  }, [setErrorMessage]);

  // проверяем localStorage на наличие фильмов и сохраняем в соответсвующий стейт
  const [searchMovies, setSearchMovies] = useState(() =>
    checkLocalStorage('searchMovies'),
  );
  const [myMovies, setMyMovies] = useState(() => checkLocalStorage('myMovies'));

  // Переписать
  const getInitial = useCallback(async () => {
    setPreloader(true);
    try {
      const initialsUser = await mainApi.getUserMe();
      const initialsCard = await mainApi.getMovies();
      setAuthorized(true);
      setCurrentUser(initialsUser.data);
      setMyMovies(initialsCard.data);
      navigate('/movies');
    } catch (err) {
      console.log('getInitial => err', err); // Консоль
      navigate('/');
      setAuthorized(false);
    } finally {
      setPreloader(false);
    }
  }, [navigate]);
  useEffect(() => {
    getInitial();
  }, []);
  // Запрос фильмов с Beatfilm-Movies
  const getMovies = useCallback(async () => {
    setPreloader(true);
    try {
      const cards = await moviesApi();
      const newCards = handlingCards(cards);
      localStorage.setItem('searchMovies', JSON.stringify(newCards));
      setSearchMovies(() => checkLocalStorage('searchMovies'));
    } catch (err) {
      console.log('getMovies => err', err);
      setErrorMessage(err.message);
    } finally {
      setPreloader(false);
    }
  }, []);
  // обработчик лайков и дизлайков
  const cbLike = async (card) => {
    setPreloader(true);
    let isLiked;
    const isMy = myMovies?.find((i) => i.movieId === card.movieId);
    try {
      if (!isMy) {
        // Добавляем карточку
        const mewMyMovie = await mainApi.postMovies(
          Object.keys(card)
            .filter((key) => key !== '_id')
            .reduce((res, key) => {
              res[key] = card[key];
              return res;
            }, {}),
        );
        setMyMovies([...myMovies, mewMyMovie.data]);
        isLiked = true;
      } else {
        // Удаляем карточку
        const resultDelete = await mainApi.deleteMovies(isMy._id);
        console.log('cbLike => Снять лайк', resultDelete);
        const resultMyCards = myMovies.filter(
          (i) => i.movieId !== card.movieId,
        );
        setMyMovies([...resultMyCards]);
        isLiked = false;
      }
      // вернуть информацию в отображаемую карточку
      return isLiked;
    } catch (err) {
      console.log('cbCardLike => err', err); // Консоль
    } finally {
      setPreloader(false);
    }
  };
  // Обновление данных пользователя
  const cbUpdateUser = async (userData) => {
    setPreloader(true);
    try {
      const user = await mainApi.patchUserMe(userData);
      setCurrentUser(user.data);
      return;
    } catch (err) {
      console.log('cbUpdateUser => err', err); // Консоль
      setErrorMessage(err.message);
    } finally {
      setPreloader(false);
    }
  };
  // Авторизация
  const cbSignIn = async (userData) => {
    setPreloader(true);
    try {
      const user = await mainApi.postSignin(userData);
      setCurrentUser(user.data);
      setAuthorized(true);
      getInitial();
      navigate('/movies');
    } catch (err) {
      console.log('cbSignIn => err', err); // Консоль
      setErrorMessage(err.message);
    } finally {
      setPreloader(false);
    }
  };
  // Выход
  const cbSignOut = async () => {
    setPreloader(true);
    try {
      const res = await mainApi.getSignout();
      console.log('cbSignOut => res', res); // Консоль
      setAuthorized(false);
      // Очистка данных
      localStorage.clear();
      setCurrentUser(null);
      setSearchMovies([]);
      setMyMovies([]);
    } catch (err) {
      console.log('cbSignOut => err', err); // Консоль
      setErrorMessage(err.message);
    } finally {
      setPreloader(false);
      navigate('/');
    }
  };
  // Регистрация
  const cbSignUp = async (userData) => {
    setPreloader(true);
    try {
      // переписать, не очень красиво написал
      const res = await mainApi.postSignup(userData);
      console.log('cbSignUp => res', res); // Консоль
      cbSignIn({
        email: userData.email,
        password: userData.password,
      });
    } catch (err) {
      console.log('cbSignUp => err', err); // Консоль
      setErrorMessage(err.message);
    } finally {
      setPreloader(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
  }, [myMovies]);
  useEffect(() => {
    localStorage.setItem('searchMovies', JSON.stringify(searchMovies));
  }, [searchMovies]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ErrorContext.Provider value={isErrorMessage}>
        <RessetErrorContext.Provider value={ressetError}>
          {isPreloader && <Preloader />}
          <ProtectedRoute isAuthorized={isAuthorized}>
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
                      <SearchMovies
                        getMovies={getMovies}
                        movies={searchMovies}
                        onLike={cbLike}
                        isPreloader={isPreloader}
                      />
                    }
                  />
                  {/* 3 Уровень вложенности */}
                  <Route
                    path="/saved-movies"
                    element={
                      <SavedMovies
                        movies={myMovies}
                        onLike={cbLike}
                        isPreloader={isPreloader}
                      />
                    }
                  />
                </Route>
                {/* 2 Уровень вложенности */}
                <Route
                  path="/profile"
                  element={
                    <Profile
                      onSignOut={cbSignOut}
                      onUpdateUser={(userData) => cbUpdateUser(userData)}
                    />
                  }
                />
              </Route>
              {/* 1 Уровень вложенности */}
              <Route
                path="/signup"
                element={
                  <Register onSignUp={(userData) => cbSignUp(userData)} />
                }
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
          </ProtectedRoute>
        </RessetErrorContext.Provider>
      </ErrorContext.Provider>
    </CurrentUserContext.Provider>
  );
};
