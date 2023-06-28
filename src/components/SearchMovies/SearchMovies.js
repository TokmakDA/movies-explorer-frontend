import React, { useEffect, useState } from 'react';
import './SearchMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { useCheckbox } from '../../hooks/useCheckbox';
import { filterCheckbox } from '../../utils/filterMovies';

export const SearchMovies = ({ movies, onLike }) => {
  const { checked, chengeCheckbox } = useCheckbox();
  const [currentMovies, setMovies] = useState([]);
  useEffect(() => {
    console.log('MoviesCardList => checked', checked);
    setMovies(filterCheckbox(movies, checked));
  }, [movies, checked, setMovies]);
  return (
    <section className="movies">
      <SearchForm
        // onSubmit={findMovies}
        checked={checked}
        onCheck={chengeCheckbox}
      />
      <MoviesCardList
        movies={currentMovies}
        onLike={onLike}
      />
      <SavedDevider />
    </section>
  );
};
