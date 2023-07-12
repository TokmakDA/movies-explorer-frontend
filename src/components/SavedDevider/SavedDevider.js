import React from 'react';
import './SavedDevider.css';

export const SavedDevider = ({isNoMoviesFound}) => {
  const element = (<p className='movies__message'>Ни чего не найдено</p>)
  return (
    <div className="movies__deveder">
      {isNoMoviesFound ? element : null}
    </div>
  );
};


