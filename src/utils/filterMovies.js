export const filterMovies = (dataCards, value) => {
  const movies = dataCards.filter((i) =>
    [i.nameRU, i.nameEN, i.description, i.country, i.director]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()),
  );
  console.log('filterMovies => value, movies', value, movies);
  return movies;
};

export const filterCheckbox = (movies, isCheckbox) => {
  return isCheckbox ? movies.filter((card) => card.duration <= '40') : movies;
};
