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
  const { checked, setChecked, chengeCheckbox } = useCheckbox();
  const filterMovies = filterCheckbox(movies, checked);

  const [isQuantity, setQuantity] = useState(null);
  const { isScreenLg, isScreenSm } = useResize();
  useEffect(() => {
    isScreenLg ? setQuantity(16) : isScreenSm ? setQuantity(8) : setQuantity(4);
  }, [isScreenLg, isScreenSm]);

  const handleMore = (e, isQuantity) => {
    e.preventDefault();
    setQuantity(isScreenLg ? isQuantity + 4 : isQuantity + 2);
  };

  return (
    <section className="movies">
      <SearchForm
        onSubmit={findMovies}
        checked={checked}
        onCheck={chengeCheckbox}
      />
      <MoviesCardList
        quantity={isQuantity}
        insideMovies={true}
        movies={filterMovies}
        onLike={onLike}
      />
      {filterMovies.length > isQuantity ? (
        <More onClick={(e) => handleMore(e, isQuantity)} />
      ) : (
        <SavedDevider />
      )}
    </section>
  );
};
