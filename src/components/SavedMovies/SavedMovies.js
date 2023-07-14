import React, { useContext, useEffect, useState } from 'react';
import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SavedDevider } from '../SavedDevider/SavedDevider';
import { useCheckbox } from '../../hooks/useCheckbox';
import { filterCheckbox, filterMovies } from '../../utils/filterMovies';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const SavedMovies = ({ movies, onLike }) => {
  // const isPreloader = useContext(IsPreloaderContext);
  const { checked, chengeCheckbox } = useCheckbox();
  const [currentMovies, setMovies] = useState([]);
  const [cгrrentFilterMovies, setFilterMovies] = useState([]);
  const { values, handleChange, hasChanges } = useFormWithValidation();

  const initialForm = { search: '' };

  //Только Свои
  const handleSearch = (e) => {
    e.preventDefault();
    setMovies(filterMovies(movies, values.search));
  };

  useEffect(() => {
    setMovies(filterMovies(movies, values.search || ''));
  }, [movies, values, setMovies]);

  useEffect(() => {
    setFilterMovies(filterCheckbox(currentMovies, checked));
  }, [currentMovies, checked, setFilterMovies]);

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
      <MoviesCardList
        movies={cгrrentFilterMovies}
        onLike={onLike}
      />
      <SavedDevider />
    </section>
  );
};
