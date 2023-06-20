import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import { useResize } from '../../hooks/useResize';
import More from '../More/More';

function Movies() {
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
    <section className="content__movies movies">
      <SearchForm />
      <MoviesCardList quantity={isQuantity} insideMovies={true}/>
      <More onClick={(e) => handleClick(e, isQuantity)} />
    </section>
  );
}

export default Movies;
