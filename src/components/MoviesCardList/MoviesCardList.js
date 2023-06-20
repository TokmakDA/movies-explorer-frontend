import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useCallback } from 'react';

const MoviesCardList = ({ quantity, insideMovies }) => {
  // Временная конструкция
  const myCards = JSON.parse(localStorage.getItem('myMovies'));
  const searchMovies = JSON.parse(localStorage.getItem('searhMovies'));
  const moviesToRender = !insideMovies ? myCards : searchMovies;

  const renderCard = useCallback(
    (movies) => {
      return movies.slice(0, quantity).map((card) => {
        return (
          <MoviesCard
            key={card.movieId}
            card={card}
            insideMovies={insideMovies}
          />
        );
      });
    },
    [quantity],
  );

  return (
    <section className="cards">
      <ul className="cards__list">{renderCard(moviesToRender)}</ul>
    </section>
  );
};

export default MoviesCardList;
