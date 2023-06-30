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
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import { Preloader } from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi';
import { handlingCards } from '../../utils/handlingCards';
import { filterMovies } from '../../utils/filterMovies';

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
    console.log('checLocalStorage =>', key); // Удалить
    return [];
  }, []);

  // проверяем localStorage на наличие фильмов и сохраняем в соответсвующий стейт
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

  // Запрос фильмов с Beatfilm-Movies
  const getMovies = async (value) => {
    setPreloader(true);
    try {
      const cards = await moviesApi();
      const newCards = handlingCards(cards);
      const dataCards = filterMovies(newCards, value);
      localStorage.setItem('searhMovies', JSON.stringify(dataCards));
      setSearchMovies(() => checkLocalStorage('searhMovies'));
    } catch (err) {
      console.log('getMovies => err', err);
    } finally {
      setPreloader(false);
    }
  };

  const findMovies = (value) => {
    getMovies(value);
  };

  useEffect(() => {
    localStorage.setItem('myMovies', JSON.stringify(myMovies));
    localStorage.setItem('searhMovies', JSON.stringify(searchMovies));
  }, [myMovies, searchMovies]);

  // обработчик лайков и дизлайков
  const cbLike = async (card) => {
    // Проверяем лайк лайк
    const isMy = myMovies?.find((i) => i.movieId === card.movieId);
    console.log('cbLike => isMy', isMy);
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
        console.log('cbLike => !isMy => postMovies', mewMyMovie); // Удалить
        setMyMovies([...myMovies, mewMyMovie.data]);
        console.log('cbLike => !isMy => postMovies => myMovies', myMovies); // Удалить
      } else {
        // Удаляем карточку
        await mainApi.deleteMovies(isMy._id);
        console.log('cbLike => isMy => deleteMovies'); // Удалить
        const result = myMovies.filter((i) => i.movieId !== card.movieId);
        setMyMovies([...result]);
      }
      changeMyMovies(true);
      console.log('cbLike => if(){}else{} => changeMyMovies', isСhangeMyMovies); // Удалить
    } catch (err) {
      console.log('cbCardLike => err', err);
    }
  };

  // Обновление данных пользователя
  const cbUpdateUser = async (userData) => {
    setPreloader(true);
    try {
      const user = await mainApi.patchUserMe(userData);
      console.log('cbUpdateUser => user', user); // Удалить
      setCurrentUser(user.data);
      return;
    } catch (err) {
      console.log('cbUpdateUser => err', err); // Удалить
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

      console.log('cbSignIn => user', user); // Удалить
    } catch (err) {
      console.log('cbSignIn => err', err); // Удалить
    } finally {
      setPreloader(false);
      setTimeout(navigate('/movies'), 100);
    }
  };
  // Выход
  const cbSignOut = async () => {
    setPreloader(true);
    try {
      const res = await mainApi.getSignout();
      console.log('cbSignOut => res', res); // Удалить
      setAuthorized(false);
      // Очистка данных
      localStorage.clear();
      setCurrentUser(null);
      setSearchMovies([]);
      setMyMovies([]);
    } catch (err) {
      console.log('cbSignOut => err', err); // Удалить
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
      cbSignIn({
        email: NewData.email,
        password: NewData.password,
      });
      console.log('cbSignUp => res', res); // Удалить
    } catch (err) {
      console.log('cbSignUp => err', err); // Удалить
    } finally {
      setPreloader(false);
    }
  };

  // Переписать
  const getInitial = useCallback(async () => {
    setPreloader(true);
    try {
      const initialsUser = await mainApi.getUserMe();
      const initialsCard = await mainApi.getMovies();
      console.log('getInitial => initialsUser', initialsUser); // Удалить
      console.log('getInitial => initialsCard', initialsCard); // Удалить
      setAuthorized(true);
      setCurrentUser(initialsUser.data);
      setMyMovies(initialsCard.data);
      navigate('/movies');
    } catch (err) {
      console.log('getInitial => err', err); // Удалить
      navigate('/');
      setAuthorized(false);
    } finally {
      setPreloader(false);
    }
  }, [navigate]);
  useEffect(() => {
    getInitial();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                  <Movies
                    findMovies={(value) => findMovies(value)}
                    movies={searchMovies}
                    changeMyMovies={changeMyMovies}
                    onLike={cbLike}
                  />
                }
              />
              {/* 3 Уровень вложенности */}
              <Route
                path="/saved-movies"
                element={
                  <SavedMovies
                    movies={myMovies}
                    changeMyMovies={changeMyMovies}
                    onLike={cbLike}
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
            element={<Register onSignUp={(userData) => cbSignUp(userData)} />}
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
    </CurrentUserContext.Provider>
  );
};
