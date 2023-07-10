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
import { useForm } from '../../hooks/useForm';

export const Movies = ({
  findMovies,
  movies,
  onLike,
  localStorageKey,
  insideMovies,
}) => {
  const { checked, chengeCheckbox, setChecked } = useCheckbox();
  const [isQuantity, setQuantity] = useState(null);
  const { isScreenXl, isScreenLg, isScreenSm } = useResize();
  const [currentMovies, setMovies] = useState([]);

  const { values, handleChange, setValues } = useForm();

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

  // Проверить localStorage currentPage
  const checkCurentPage = useCallback(() => {
    const isPage = JSON.parse(localStorage.getItem(localStorageKey));
    if (isPage) {
      return isPage;
    }
    return {};
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
    // console.log(currentPage);
  }, [checked, isQuantity, values]);

  const handleSearch = (event) => {
    event.preventDefault();
    findMovies(values.search);
    changeQuantity();
  };

  useEffect(() => {
    setMovies(filterCheckbox(movies, checked));
  }, [movies, checked, setMovies]);

  useEffect(() => {
    if (!insideMovies) {
      findMovies(values?.search);
    }
  }, [values, findMovies, insideMovies]);

  useEffect(() => {
    changeQuantity();
  }, [changeQuantity]);

  return (
    <section className="movies">
      <SearchForm
        onSubmit={handleSearch}
        checked={checked}
        onCheck={chengeCheckbox}
        values={values}
        handleChange={handleChange}
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
        <SavedDevider />
      )}
    </section>
  );
};
