import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
// import { useForm } from '../../hooks/useForm';
// import { useEffect } from 'react';

export const SearchForm = ({
  onSubmit,
  checked,
  onCheck,
  values,
  handleChange,
}) => {
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
              value={values?.search || ''}
              name="search"
              required
              onChange={(e) => handleChange(e)}
            ></input>
            <button
              type="submit"
              className="search__find"
              placeholder="Искать"
              disabled={values?.search === '' ? true : false}
            ></button>
            <hr className="search__stick"></hr>
          </div>
          <FilterCheckbox
            className="search__checkbox"
            checked={checked}
            onCheck={onCheck}
          />
        </fieldset>
      </form>
      <hr className="search__line" />
    </div>
  );
};
