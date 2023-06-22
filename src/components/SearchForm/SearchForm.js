import React from 'react';
import './SearchForm.css';

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
              className="search__find content__button"
              placeholder="Искать"
            ></button>
            <hr className="search__stick"></hr>
          </div>
          <label className="search__label-checkbox content__button">
            <input
              type="checkbox"
              className="search__checkbox"
            ></input>
            Короткометражки
          </label>
        </fieldset>
      </form>
      <hr className="search__line" />
    </div>
  );
};
