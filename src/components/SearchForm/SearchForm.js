import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <div className="search">
      <form className="search__form">
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
              type="image"
              className="search__find content__button"
              placeholder="Искать"
              name="searchMovie"
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
}

export default SearchForm;
