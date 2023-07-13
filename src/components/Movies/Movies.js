import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './Movies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { More } from '../More/More';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { filterCheckbox } from '../../utils/filterMovies';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentErrorContext } from '../../contexts/CurrentErrorContext';
import { RessetErrorContext } from '../../contexts/RessetErrorContext';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const Movies = ({
  findMovies,
  movies,
  onLike,
  localStorageKey,
  insideMovies,
}) => {
  const { checked, chengeCheckbox, setChecked } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const [currentMovies, setMovies] = useState([]);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();
  const { values, handleChange, setValues, hasChanges } =
    useFormWithValidation();

  const isErrorMessage = useContext(CurrentErrorContext);
  const ressetError = useContext(RessetErrorContext);
  const isPreloader = useContext(IsPreloaderContext);

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
  }, [localStorageKey]);

  const [currentPage, setCurrentPage] = useState(() => checkCurentPage());

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(currentPage));
  }, [currentPage, localStorageKey]);

  useEffect(() => {
    if (currentPage) {
      const { checked, isQuantity, values } = currentPage;
      setChecked(checked);
      setQuantity(isQuantity);
      setValues(values);
      values?.search && findMovies(values.search);
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

  useEffect(() => {
    ressetError();
  }, [values, ressetError]);

  useEffect(() => {
    ressetError();
  }, [values, ressetError]);

  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        checked={checked}
        onCheck={chengeCheckbox}
        values={values}
        handleChange={handleChange}
        disabledSubmit={hasChanges(initialForm) || isPreloader}
      />
      <MoviesCardList
        quantity={isQuantity}
        insideMovies={insideMovies}
        movies={currentMovies}
        onLike={onLike}
      />
      {currentMovies.length > isQuantity ? (
        <More onClick={(e) => handleMore(e, isQuantity)} />
      ) : (
        <SavedDevider
          isNoMoviesFound={isNoMoviesFound}
          isErrorMessage={isErrorMessage}
        />
      )}
    </section>
  );
};
