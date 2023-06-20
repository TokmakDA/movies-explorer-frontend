import React, { useEffect } from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import SavedMovies from '../SavedMovies/SavedMovies';
import Preloader from '../Preloader/Preloader';
import { NewMovies } from '../../data/NewMovies';


function App() {
  useEffect(() => {
    localStorage.setItem('myMovies', '[]');
    localStorage.setItem('searhMovies', JSON.stringify(NewMovies));
  }, []);

  return (
    <>
      <Header />
      <Main></Main>
      <Movies />
      <SavedMovies />
      <Footer />
      <Login />
      <Register />
      <Profile />
      <NotFound />
      <Menu />
    </>
  );
}

export default App;
