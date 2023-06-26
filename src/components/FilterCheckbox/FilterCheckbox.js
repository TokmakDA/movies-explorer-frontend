import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = ({className}) => {
  return (
    <label className={`filter-checkbox ${className}`}>
      <input
        type="checkbox"
        className="filter-checkbox__input"
      ></input>
      Короткометражки
    </label>
  );
};
