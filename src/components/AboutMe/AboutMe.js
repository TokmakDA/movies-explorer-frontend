import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/MyPhoto.jpg';
import { Link } from 'react-router-dom';

export const AboutMe = () => {
  return (
    <div className="student__about-me about-me">
      <img
        className="about-me__photo"
        src={myPhoto}
        alt="Фото"
      />
      <p className="about-me__name">Дмитрий</p>
      <h3 className="about-me__brief">Фронтенд-разработчик, 32 года</h3>
      <p className="about-me__description">
        Я живу в городе Владимир. Женат, детей нет. Окончил экономический
        факультет ВЛГУ по специальности: "Экономика и управление в
        строительстве". Последние 5 лет работал в строительной сфере по
        обеспечению пожарной безопасности. В 2022 году я решил сменить сферу
        деятельности и выбрал программирование. Я люблю современные технологии и
        качественный продукт, как получать, так и предоставлять. В настоящий
        момент завершаю обучение на курсе Веб-разработка в Яндекс.Практикуме.
      </p>
      <Link className="about-me__link">Github</Link>
    </div>
  );
};
