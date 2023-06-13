import React, { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card }) => {
  // const card = {
  //   movieId: 1,
  //   nameRU: '«Роллинг Стоунз» в изгнании',
  //   nameEN: 'Stones in Exile',
  //   director: 'Стивен Кайак ',
  //   country: 'США',
  //   year: '2010',
  //   duration: 61,
  //   description:
  //     'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
  //   trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
  //   image:
  //     'https://api.nomoreparties.co/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
  //   thumbnail:
  //     'https://api.nomoreparties.co/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
  // };
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

      <p className="card__name">{card.description}</p>
      <button className="card__like"></button>
      <p className="card__time">{returnDuration(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;
