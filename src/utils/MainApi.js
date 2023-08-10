import { NOT_CONNECT_ERROR } from '../constants/errorsMessage';

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }
  // Проверяем ответ сервера
  _checkResponse = async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      const err = await res.json();
      if (err.validation) {
        return Promise.reject(
          err.validation.body.message ||
            err.validation.params.message ||
            err.message,
        );
      } else if (err.message) {
        return Promise.reject(err.message);
      } else {
        return Promise.reject(NOT_CONNECT_ERROR);
      }
    }
  };
  // Делаем запрос на сервер
  _makeRequest = async (url, method, body) => {
    const config = {
      method,
      credentials: this._credentials,
      headers: this._headers,
    };
    if (body !== undefined) {
      config.body = JSON.stringify(body);
    }
    const res = await fetch(`${this._baseUrl}${url}`, config);
    return this._checkResponse(res);
  };

  // проверяет переданные в теле почту и пароль
  // и возвращает JWT
  postSignin = (user) => this._makeRequest('signin', 'POST', user);
  // создаёт пользователя с переданными в теле
  // email, password и name
  postSignup = (newUser) => this._makeRequest('signup', 'POST', newUser);
  // Выход
  getSignout = () => this._makeRequest('signout', 'GET');
  // возвращает информацию о пользователе (email и имя)
  getUserMe = () => this._makeRequest('users/me', 'GET');
  // обновляет информацию о пользователе (email и имя)
  patchUserMe = (userData) => this._makeRequest('users/me', 'PATCH', userData);
  // возвращает все сохранённые текущим  пользователем фильмы
  getMovies = () => this._makeRequest('movies', 'GET');
  // создаёт фильм с переданными в теле
  // country, director, duration, year, description, image,
  // trailer, nameRU, nameEN и thumbnail, movieId
  postMovies = (card) => this._makeRequest('movies', 'POST', card);
  // удаляет сохранённый фильм по id
  deleteMovies = (cardID) => this._makeRequest(`movies/${cardID}`, 'DELETE');
}

const config = {
  baseUrl: 'https://api.diploma.e-tokmak.ru/',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const mainApi = new MainApi(config);
