import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedDevider from '../SavedDevider/SavedDevider';

function SavedMovies() {
  return (
    <section className="">
      <SearchForm />
      <MoviesCardList isMy={true} />
      <SavedDevider />
    </section>
  );
}

export default SavedMovies;
