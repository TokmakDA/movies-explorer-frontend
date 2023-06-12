import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <form className="search__form">
      <fieldset className="search__fieldset">
        <input
          type="search"
          className="search__input"
          id="place-image-name"
          placeholder="Фильм"
          defaultValue=""
          name="searchMovie"
        ></input>
        <button
          type="image"
          className="search__find"
          placeholder="Искать"
          name="searchMovie"
        ></button>
        <hr className="search__line"></hr>
        <label className="search__label-checkbox">
          <input
            type="checkbox"
            className="search__checkbox"
          ></input>
          Короткометражки
        </label>
      </fieldset>
    </form>
  );
}

export default SearchForm;
