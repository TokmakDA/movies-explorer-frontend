import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { useCheckbox } from '../../hooks/useCheckbox';
import { filterCheckbox, filterMovies } from '../../utils/filterMovies';
import { More } from '../More/More';
import { useResize } from '../../hooks/useResize';

export const SavedMovies = ({ movies, onLike }) => {
  const { checked, chengeCheckbox } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();

  const [currentMovies, setMovies] = useState([]);

  //Только Свои
  const handleSearch = (value) => {
    setMovies(filterMovies(movies, value));
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
        movies={currentMovies}
        onLike={onLike}
      />
      {currentMovies.length > isQuantity ? (
        <More onClick={(e) => handleMore(e, isQuantity)} />
      ) : (
        <SavedDevider />
      )}{' '}
    </section>
  );
};
