import React from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SavedDevider } from '../SavedDevider/SavedDevider';

export const SavedMovies = ({ movies, changeMyMovies }) => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList
        movies={movies}
        changeMyMovies={changeMyMovies}
      />
      <SavedDevider />
    </section>
  );
};
