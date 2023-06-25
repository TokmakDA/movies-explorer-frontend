import React, { useContext, useState } from 'react';
import './MoviesCard.css';

export const MoviesCard = ({ card, insideMovies, changeMyMovies }) => {
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
    setMyCards(localStorage.setItem('myMovies', JSON.stringify([...result])));

    changeMyMovies(true);
  };
  const addCard = () => {
    localStorage.getItem('myMovies') === null &&
      localStorage.setItem('myMovies', '[]');
    const cards = JSON.parse(localStorage.getItem('myMovies'));
    setMyCards(
      localStorage.setItem('myMovies', JSON.stringify([...cards, card])),
    );
    changeMyMovies(true);
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
  const cardLikeButtonClassName = `movies__like ${
    insideMovies ? isLiked && 'movies__like_active' : 'movies__like_delete'
  }`;

  return (
    <li className="movies__card">
      <div className="movies__img-wrapper">
        <img
          className="movies__img"
          src={card.image}
          alt="Постер"
        ></img>
      </div>

      <p className="movies__name">{card.nameRU}</p>
      <button
        className={cardLikeButtonClassName}
        onClick={handleClick}
      ></button>
      <p className="movies__time">{returnDuration(card.duration)}</p>
    </li>
  );
};
