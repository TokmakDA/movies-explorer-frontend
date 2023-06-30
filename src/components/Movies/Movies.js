import React, { useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './Movies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { More } from '../More/More';
import { filterCheckbox } from '../../utils/filterMovies';

import { useCheckbox } from '../../hooks/useCheckbox';
import { SavedDevider } from '../SavedDevider/SavedDevider';

export const Movies = ({ findMovies, movies, onLike }) => {
  const { checked, chengeCheckbox } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();
  const [currentMovies, setMovies] = useState([]);

  // const [pageState, setPageState] = useState({
  //   isQuantity,
  //   checked,
  //   curentValue,
  // });
  // useEffect(() => {
  //   setPageState(JSON.parse(localStorage.getItem('pageState')));
  // }, []);

  // useEffect(() => {
  //   setPageState({
  //     isQuantity,
  //     checked,
  //     curentValue,
  //   });
  // }, [setPageState, isQuantity, checked, curentValue]);

  // useEffect(() => {
  //   setPageState(JSON.parse(localStorage.getItem('pageState')));
  // }, []);

  const handleSearch = (value) => {
    findMovies(value);
  };

  useEffect(() => {
    setMovies(filterCheckbox(movies, checked));
  }, [movies, checked, setMovies]);

  const handleMore = (e, isQuantity) => {
    e.preventDefault();
    setQuantity(
      isScreenXl
        ? isQuantity + 4
        : isScreenLg
        ? isQuantity + 3
        : isQuantity + 2,
    );
  };
  useEffect(() => {
    isScreenXl
      ? setQuantity(16)
      : isScreenLg
      ? setQuantity(12)
      : isScreenSm
      ? setQuantity(8)
      : setQuantity(4);
  }, [isScreenXl, isScreenLg, isScreenSm, setQuantity]);

  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        checked={checked}
        onCheck={chengeCheckbox}
      />
      <MoviesCardList
        quantity={isQuantity}
        insideMovies={true}
        movies={currentMovies}
        onLike={onLike}
      />
      {currentMovies.length > isQuantity ? (
        <More onClick={(e) => handleMore(e, isQuantity)} />
      ) : (
        <SavedDevider />
      )}
    </section>
  );
};
