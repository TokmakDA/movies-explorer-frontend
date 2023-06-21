import React, { useState } from 'react';
import './MoviesCard.css';

export const MoviesCard = ({ card, insideMovies }) => {
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

  const deleteCard = () => {
    const cards = JSON.parse(localStorage.getItem('myMovies'));
    const result = cards.filter((i) => i.movieId !== card.movieId);
    console.log('deleteCard => result', result);
    setMyCards(localStorage.setItem('myMovies', JSON.stringify([...result])));
    console.log(
      'new localStorage "myMovies"',
      JSON.parse(localStorage.getItem('myMovies')),
    );
  };
  const addCard = () => {
    localStorage.getItem('myMovies') === null &&
      localStorage.setItem('myMovies', '[]');
    const cards = JSON.parse(localStorage.getItem('myMovies'));
    setMyCards(
      localStorage.setItem('myMovies', JSON.stringify([...cards, card])),
    );
  };
  const handleClick = () => {
    // Проверяем локацию
    if (insideMovies) {
      //  Проверяем лайк
      if (!isLiked) {
        // Добавляем лайк
        addCard();
        return setLiked(!isLiked);
      }
      deleteCard();
      return setLiked(!isLiked);
    } else {
      // Удаляем карточку из сохраненных
      console.log('handleClick => ');

      return deleteCard();
    }
  };
  const cardLikeButtonClassName = `card__like ${
    insideMovies ? isLiked && 'card__like_active' : 'card__like_delete'
  }`;

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
        className={cardLikeButtonClassName}
        onClick={handleClick}
      ></button>
      <p className="card__time">{returnDuration(card.duration)}</p>
    </li>
  );
};
