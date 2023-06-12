import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {
  return (
    <section className="content">
      <SearchForm/>
      {/* <Preloader/> */}
      <MoviesCardList/>
      <MoviesCard/>
    </section>
  );
}

export default Movies;
