class MoviesApi {
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
      try {
        const err = await res.json();
        if (err.validation) {
          throw new Error(
            err.validation.body.message ||
              err.validation.params.message ||
              err.message,
          );
        } else if (err.message) {
          throw new Error(err.message);
        } else {
          throw new Error('Неизвестная ошибка');
        }
      } catch (e) {
        return Promise.reject(e);
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
  // возвращает все сохранённые текущим  пользователем фильмы
  getMovies = () => this._makeRequest('movies', 'GET');
}

const config = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies/',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

// export const moviesApi = new MoviesApi(config);

export const moviesApi = async () => {
  const res = await fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: {
      authorization: '0fac7cb1-5a97-4e4b-9bc6-bcf4a65057a3',
      'Content-Type': 'application/json',
    },
  });
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};
