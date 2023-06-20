import React, { useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { NewMovies } from '../../data/NewMovies';
import { useCallback } from 'react';

const MoviesCardList = ({ quantity, insideMovies, isMy }) => {
  const firstRender = useCallback(
    (movies) => {
      return movies.slice(0, quantity).map((card) => {
        return (
          <MoviesCard
            key={card.id}
            card={card}
            isMy={isMy}
            insideMovies={insideMovies}
          />
        );
      });
    },
    [quantity],
  );

  return (
    <section className="cards">
      <ul className="cards__list">{firstRender(NewMovies)}</ul>
    </section>
  );
};

export default MoviesCardList;
