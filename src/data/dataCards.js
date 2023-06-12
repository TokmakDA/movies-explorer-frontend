const cards = require('./cards');

let newCards = [];
cards.forEach((card) => {
  let newCard = {
    movieId: card?.id,
    nameRU: card?.nameRU,
    nameEN: card?.nameEN,
    director: card?.director,
    country: card?.country,
    year: card?.year,
    duration: card?.duration,
    description: card?.description,
    trailerLink: card?.trailerLink,
    image: `https://api.nomoreparties.co${card?.image?.url}`,
    thumbnail: `https://api.nomoreparties.co${card?.image?.formats?.thumbnail?.url}`,
  };
  return newCards.push(newCard);
});

console.log(newCards);
