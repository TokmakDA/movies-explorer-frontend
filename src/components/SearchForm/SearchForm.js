import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';
import { useContext } from 'react';

export const SearchForm = ({
  onSubmit,
  checked,
  onCheck,
  values,
  handleChange,
  disabledSubmit,
}) => {
  const isPreloader = useContext(IsPreloaderContext);

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
              onChange={handleChange}
              disabled={isPreloader}
            ></input>
            <button
              type="submit"
              className="search__find"
              placeholder="Искать"
              disabled={disabledSubmit}
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
