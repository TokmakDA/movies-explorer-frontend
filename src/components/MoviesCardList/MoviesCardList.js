import React from 'react';

import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({
  quantity,
  insideMovies,
  movies,
  onLike
}) => {
  return (
    <ul className="movies__cards">
      {movies !== null &&
        movies.slice(0, quantity).map((card) => {
          return (
            <MoviesCard
              key={card._id}
              card={card}
              insideMovies={insideMovies}
              onLike={onLike}
            />
          );
        })}
    </ul>
  );
};
