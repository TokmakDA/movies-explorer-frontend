import React, { useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './Movies.css';

import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { More } from '../More/More';

export const Movies = ({ findMovies, movies, changeMyMovies }) => {
  const [isQuantity, setQuantity] = useState(null);
  const { isScreenLg, isScreenSm } = useResize();
  useEffect(() => {
    isScreenLg ? setQuantity(16) : isScreenSm ? setQuantity(8) : setQuantity(4);
  }, [isScreenLg, isScreenSm]);

  const handleClick = (e, isQuantity) => {
    e.preventDefault();
    setQuantity(isQuantity + 4);
  };

  return (
    <section className="movies">
      <SearchForm onSubmit={findMovies} />
      <MoviesCardList
        quantity={isQuantity}
        insideMovies={true}
        movies={movies}
        changeMyMovies={changeMyMovies}
      />
      <More onClick={(e) => handleClick(e, isQuantity)} />
    </section>
  );
};
