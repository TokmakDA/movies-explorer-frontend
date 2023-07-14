import React from 'react';
import './SavedDevider.css';

export const SavedDevider = ({ isNoMoviesFound, isErrorMessage }) => {
  const element = (
    <p className="movies__message">{isErrorMessage || 'Ни чего не найдено'}</p>
  );
  return (
    <div className="movies__deveder">
      {isNoMoviesFound || isErrorMessage ? element : null}
    </div>
  );
};
