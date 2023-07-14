import { ERROR_GET_MOVIES } from '../constants/errorsMessage';

export const moviesApi = async () => {
  const res = await fetch('https://api.nomoreparties.co/beatfilm-movies/', {
    method: 'GET',
  });

  if (res.ok) {
    return await res.json();
  } else {
    return Promise.reject(ERROR_GET_MOVIES);
  }
};
