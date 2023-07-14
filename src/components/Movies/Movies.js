import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import './Movies.css';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { More } from '../More/More';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { filterCheckbox, filterMovies } from '../../utils/filterMovies';
import { useCheckbox } from '../../hooks/useCheckbox';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { CurrentErrorContext } from '../../contexts/CurrentErrorContext';
import { RessetErrorContext } from '../../contexts/RessetErrorContext';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const Movies = ({ getMovies, movies, onLike }) => {
  const { checked, chengeCheckbox, setChecked } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const [currentMovies, setMovies] = useState([]);
  const [cгrrentFilterMovies, setFilterMovies] = useState([]);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();
  const { values, handleChange, setValues, hasChanges } =
    useFormWithValidation();
  const [value, setValue] = useState(null);
  // Состояние выполнить поиск
  const [isRunSearch, setRunSearch] = useState(false);
  const [isNoMoviesFound, setNoMoviesFound] = useState(false);

  const isErrorMessage = useContext(CurrentErrorContext);
  const ressetError = useContext(RessetErrorContext);
  const isPreloader = useContext(IsPreloaderContext);

  const initialForm = { search: '' };

  const handleFindMovies = (value) => {
    if (movies.length === 0) {
      getMovies();
    }
    setValue(value);
  };

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
    setFilterMovies(filterCheckbox(currentMovies, checked));
  }, [currentMovies, checked, setFilterMovies]);

  // Проверить localStorage currentPage
  const checkCurentPage = useCallback(() => {
    const isPage = JSON.parse(localStorage.getItem('searchPage'));
    if (isPage) {
      return isPage;
    }
    return { values: { search: '' } };
  }, []);

  const [currentPage, setCurrentPage] = useState(() => checkCurentPage());

  useEffect(() => {
    localStorage.setItem('searchPage', JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (currentPage) {
      const { checked, isQuantity, values } = currentPage;
      setChecked(checked);
      setQuantity(isQuantity);
      setValues(values);
      values?.search && handleFindMovies(values.search);
    }
  }, []);

  useEffect(() => {
    setCurrentPage({ checked, isQuantity, values });
  }, [checked, isQuantity, values]);

  useEffect(() => {
    if (value) {
      setMovies(filterMovies(movies, value));
    }
  }, [movies, value]);

  // ручка поиск
  const handleSearch = (event) => {
    event.preventDefault();
    handleFindMovies(values.search);
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
        insideMovies={true}
        movies={cгrrentFilterMovies}
        onLike={onLike}
      />
      {cгrrentFilterMovies.length > isQuantity ? (
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
