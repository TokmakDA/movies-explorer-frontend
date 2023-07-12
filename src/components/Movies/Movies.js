import React, { useCallback, useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './Movies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { More } from '../More/More';
import { filterCheckbox } from '../../utils/filterMovies';

import { useCheckbox } from '../../hooks/useCheckbox';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export const Movies = ({
  findMovies,
  movies,
  onLike,
  localStorageKey,
  insideMovies,
  isPreloader,
}) => {
  const { checked, chengeCheckbox, setChecked } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const [currentMovies, setMovies] = useState([]);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();
  const { values, handleChange, setValues, hasChanges } =
    useFormWithValidation();
  const initialForm = { search: '' };

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
  const changeQuantity = useCallback(() => {
    isScreenXl
      ? setQuantity(16)
      : isScreenLg
      ? setQuantity(12)
      : isScreenSm
      ? setQuantity(8)
      : setQuantity(4);
  }, [isScreenXl, isScreenLg, isScreenSm, setQuantity]);

  // useEffect(() => {
  //   changeQuantity();
  // }, [changeQuantity]);

  useEffect(() => {
    !isQuantity && changeQuantity();
  }, [isQuantity, changeQuantity]);

  useEffect(() => {
    setMovies(filterCheckbox(movies, checked));
  }, [movies, checked, setMovies]);

  useEffect(() => {
    if (!insideMovies) {
      findMovies(values?.search);
    }
  }, [values, findMovies, insideMovies]);

  // Проверить localStorage currentPage
  const checkCurentPage = useCallback(() => {
    const isPage = JSON.parse(localStorage.getItem(localStorageKey));
    if (isPage) {
      return isPage;
    }
    return { values: { search: '' } };
  }, []);

  const [currentPage, setCurrentPage] = useState(() => checkCurentPage());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (currentPage) {
      const { checked, isQuantity, values } = currentPage;
      // console.log(currentPage);
      setChecked(checked);
      setQuantity(isQuantity);
      setValues(values);
      values?.search && findMovies(values.search);
      console.log(currentPage);
    }
  }, []);

  useEffect(() => {
    setCurrentPage({ checked, isQuantity, values });
  }, [checked, isQuantity, values]);

  // Состояние выполнить поиск
  const [isRunSearch, setRunSearch] = useState(false);
  const [isNoMoviesFound, setNoMoviesFound] = useState(false);

  // ручка поиск
  const handleSearch = (event) => {
    event.preventDefault();
    findMovies(values.search);
    changeQuantity();
    setRunSearch(true);
  };

  // При изменении строки поиска изменить состояние setRunSearch
  useEffect(() => {
    setRunSearch(false);
  }, [values]);

  useEffect(() => {
    isRunSearch & (currentMovies.length === 0) & !isPreloader
      ? setNoMoviesFound(true)
      : setNoMoviesFound(false);
  }, [isRunSearch, currentMovies, isPreloader]);

  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        checked={checked}
        onCheck={chengeCheckbox}
        values={values}
        handleChange={handleChange}
        disabledSubmit={hasChanges(initialForm)}
      />
      {isNoMoviesFound || (
        <MoviesCardList
          quantity={isQuantity}
          insideMovies={insideMovies}
          movies={currentMovies}
          onLike={onLike}
        />
      )}
      {currentMovies.length > isQuantity ? (
        <More onClick={(e) => handleMore(e, isQuantity)} />
      ) : (
        <SavedDevider isNoMoviesFound={isNoMoviesFound} />
      )}
    </section>
  );
};
