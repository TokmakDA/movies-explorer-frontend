import React from 'react';

import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({
  quantity,
  insideMovies,
  movies,
  changeMyMovies,
}) => {
  return (
    <ul className="movies__cards">
      {movies !== null &&
        movies.slice(0, quantity).map((card) => {
          return (
            <MoviesCard
              key={card.movieId}
              card={card}
              insideMovies={insideMovies}
              changeMyMovies={changeMyMovies}
            />
          );
        })}
    </ul>
  );
};
