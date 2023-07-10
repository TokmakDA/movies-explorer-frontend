import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = ({ className, checked, onCheck }) => {
    return (
    <label className={`filter-checkbox ${className}`}>
      <input
        type="checkbox"
        className="filter-checkbox__input"
        checked={checked | false}
        onChange={onCheck}
        onClick={(e) => console.log(e.target.checked)}
      ></input>
      Короткометражки
    </label>
  );
};
