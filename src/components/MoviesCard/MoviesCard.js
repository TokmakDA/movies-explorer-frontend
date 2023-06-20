import React, { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, insideMovies, isMy }) => {
  const [isMyMovies, setMyMovies] = useState(true);
  const returnDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours > 0 ? `${hours}ч ` : ''}${
      minutes > 0 ? `${minutes}м` : ''
    }`;
  };

  console.log(returnDuration('105'));
  const handleClick = () => {};
  return (
    <li className="card">
      <div className="card__img-wrapper">
        <img
          className="card__img"
          src={card.image}
          alt="Постер"
          onClick={() => handleClick(card)}
        ></img>
      </div>

      <p className="card__name">{card.nameRU}</p>
      <button
        className={`card__like ${
          insideMovies ? isMy && 'card__like_active' : 'card__like_delete'
        }`}
      ></button>
      <p className="card__time">{returnDuration(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;
