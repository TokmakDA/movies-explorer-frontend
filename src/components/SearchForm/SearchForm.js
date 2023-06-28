import './SearchForm.css';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import { useForm } from '../../hooks/useForm';

export const SearchForm = ({ onSubmit, checked, onCheck }) => {
  const { values, handleChange } = useForm();
  const handleValues = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  return (
    <div className="search">
      <form
        className="search__form"
        onSubmit={(e) => handleValues(e)}
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
