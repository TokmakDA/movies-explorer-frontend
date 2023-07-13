import React, { useContext } from 'react';
import './FilterCheckbox.css';
import { IsPreloaderContext } from '../../contexts/IsPreloaderContext';

export const FilterCheckbox = ({ className, checked, onCheck }) => {
  const isPreloader = useContext(IsPreloaderContext);

  return (
    <label className={`filter-checkbox ${className}`}>
      <input
        type="checkbox"
        className="filter-checkbox__input"
        checked={checked | false}
        onChange={onCheck}
        disabled={isPreloader}
      ></input>
      Короткометражки
    </label>
  );
};
