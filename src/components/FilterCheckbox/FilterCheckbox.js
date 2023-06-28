import React from 'react';
import './FilterCheckbox.css';

export const FilterCheckbox = ({ className, checked, onCheck }) => {
  return (
    <label className={`filter-checkbox ${className}`}>
      <input
        type="checkbox"
        className="filter-checkbox__input"
        checked={checked}
        onChange={onCheck}
      ></input>
      Короткометражки
    </label>
  );
};
