export const handlingCards = (cards) => {
  let newCards = [];
  cards.forEach((card) => {
    let newCard = {
      _id: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2),
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
  return newCards;
};
