import {
  ERROR_GET_MOVIES,
  NOT_CONNECT_ERROR,
} from '../constants/errorsMessage';

export const moviesApi = async () => {
  try {
    const res = await fetch('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
    });

    if (res.ok) {
      return await res.json();
    } else {
      throw new Error(ERROR_GET_MOVIES);
    }
  } catch {
    throw new Error(NOT_CONNECT_ERROR);
  }
};
