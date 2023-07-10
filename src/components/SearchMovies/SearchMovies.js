import React, { useEffect, useState } from 'react';
import './SearchMovies.css';
import { Movies } from '../Movies/Movies';
import { filterMovies } from '../../utils/filterMovies';

export const SearchMovies = ({ findMovies, movies, onLike }) => {
  const [currentMovies, setMovies] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value) {
      setMovies(filterMovies(movies, value));
    }
  }, [movies, value]);

  const handleFindMovies = (value) => {
    if (movies.length === 0) {
      findMovies();
    }
    setValue(value);
  };

  return (
    <Movies
      findMovies={(value) => handleFindMovies(value)}
      movies={currentMovies}
      onLike={onLike}
      localStorageKey={'searchPage'}
      insideMovies={true}
    />
  );
};
