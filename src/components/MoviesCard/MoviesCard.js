import React, { useState } from 'react';
import './MoviesCard.css';
import { Link } from 'react-router-dom';

export const MoviesCard = ({ card, insideMovies, onLike }) => {
  const returnDuration = (duration) => {
    const minutes = duration % 60;
    const hours = Math.floor(duration / 60);
    return `${hours > 0 ? `${hours}ч ` : ''}${
      minutes > 0 ? `${minutes}м` : ''
    }`;
  };
  const [myCards, setMyCards] = useState(
    JSON.parse(localStorage.getItem('myMovies')),
  );
  const [isLiked, setLiked] = useState(() =>
    myCards?.some((i) => i.movieId === card.movieId),
  );

  const handleClick = () => {
    onLike(card);
    return setLiked(!isLiked);
  };
  const cardLikeButtonClassName = `movies__like ${
    insideMovies ? isLiked && 'movies__like_active' : 'movies__like_delete'
  }`;

  return (
    <li className="movies__card">
      <Link
        className="movies__img-wrapper"
        to={card.trailerLink}
        target="_blank"
      >
        <img
          className="movies__img"
          src={card.image}
          alt="Постер"
        ></img>
      </Link>

      <p className="movies__name">{card.nameRU}</p>
      <button
        className={cardLikeButtonClassName}
        onClick={handleClick}
      ></button>
      <p className="movies__time">{returnDuration(card.duration)}</p>
    </li>
  );
};
