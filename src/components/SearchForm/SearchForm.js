import React from 'react';
import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';

export const SearchForm = ({ onSubmit }) => {
  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={onSubmit}
      >
        <fieldset className="search__fieldset">
          <div className="search__wrapper">
            <input
              type="search"
              className="search__input"
              placeholder="Фильм"
              defaultValue=""
              name="searchMovie"
            ></input>
            <button
              type="submit"
              className="search__find"
              placeholder="Искать"
            ></button>
            <hr className="search__stick"></hr>
          </div>
          <FilterCheckbox className="search__checkbox" />
        </fieldset>
      </form>
      <hr className="search__line" />
    </div>
  );
};
