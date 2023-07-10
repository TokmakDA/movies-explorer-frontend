import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import { Movies } from '../Movies/Movies';
import { filterMovies } from '../../utils/filterMovies';

export const SavedMovies = ({ movies, onLike }) => {
  const [currentMovies, setMovies] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      setMovies(filterMovies(movies, value));
    }
  }, [movies, value]);

  const handleFindMovies = (value) => {
    setValue(value);
  };

  return (
    <Movies
      findMovies={(value) => handleFindMovies(value)}
      movies={currentMovies}
      onLike={onLike}
      localStorageKey={'savedPage'}
      insideMovies={false}
      setValue={setValue}
    />
  );
};
