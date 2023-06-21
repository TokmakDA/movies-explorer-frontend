import React from 'react';
import './AboutProject.css';

export const AboutProject = () => {
  return (
    <section className="content__section about-project">
      <h2 className="content__title">О проекте</h2>
      <hr className="content__title-line" />
      <div className="about-project__description-wrapper">
        <div className="about-project__description-container">
          <h3 className="about-project__subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__description-container">
          <h3 className="about-project__subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timeline-wrapper">
        <div className="about-project__timeline about-project__timeline_color_green">
          1 неделя
        </div>
        <p className="about-project__direction">Back-end</p>
        <div className="about-project__timeline about-project__timeline_color_gray">
          4 недели
        </div>
        <p className="about-project__direction">Front-end</p>
      </div>
    </section>
  );
};
