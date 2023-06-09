import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/MyPhoto.jpg'
import { Link } from 'react-router-dom';

function AboutMe() {
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
        Я живу в городе Владимир. закончил экономический факультет ВЛГУ по
        специальности: "Экономика и управление в строительстве". Работал в
        сфвере пожарной безопасноти последние 5 лет. В прошлом году я решил
        сменить сферу деятельности и выбрал программирование. Я люблю
        современные технологии и качественный продукт, как получать, так и
        предоставлять. Сейчас заканчиваю курс Веб-разработчика в
        Яндекс.Практикуме.
      </p>
      <Link className="about-me__link">Github</Link>
    </div>
  );
}

export default AboutMe;
