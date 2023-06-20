import React, { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card, insideMovies }) => {
  const returnDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours > 0 ? `${hours}ч ` : ''}${
      minutes > 0 ? `${minutes}м` : ''
    }`;
  };
  const [isLike, setLike] = useState(false);

  const handleClick = () => {
    if (insideMovies) {
      if (!isLike) {
        const cards = JSON.parse(localStorage.getItem('myMovies'));
        localStorage.setItem('myMovies', JSON.stringify([...cards, card]));
      }
      return setLike(!isLike);
    } else {
      console.log('Будем удалять');
    }
  };

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
          insideMovies ? isLike && 'card__like_active' : 'card__like_delete'
        }`}
        onClick={handleClick}
      ></button>
      <p className="card__time">{returnDuration(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;
