import React from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SavedDevider } from '../SavedDevider/SavedDevider';

export const SavedMovies = () => {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
      <SavedDevider />
    </section>
  );
};
