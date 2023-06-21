import React, { useCallback, useState } from 'react';

import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({ quantity, insideMovies }) => {
  // const [myCards, setMyCards] = useState(
  //   JSON.parse(localStorage.getItem('myMovies'))
  // );

  // Временная конструкция
  const myCards = JSON.parse(localStorage.getItem('myMovies'));
  const searchMovies = JSON.parse(localStorage.getItem('searhMovies'));
  const moviesToRender = !insideMovies ? myCards : searchMovies;

  const renderCard = useCallback(
    (movies) => {
      if (movies === null) {
        return;
      }
      return movies.slice(0, quantity).map((card) => {
        return (
          <MoviesCard
            key={card.movieId}
            card={card}
            insideMovies={insideMovies}
            // myCards={myCards}
            // setMyCards={setMyCards}
          />
        );
      });
    },
    [quantity, searchMovies],
  );

  return (
    <section className="cards">
      <ul className="cards__list">{renderCard(moviesToRender)}</ul>
    </section>
  );
};
