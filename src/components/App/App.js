import React from 'react';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';

function App() {
  return (
    <>
      <Header />
      {/* <Profile/> */}
      {/* <Main></Main> */}
      <Movies />
      {/* <Footer/> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <NotFound /> */}
      <Menu/>
    </>
  );
}

export default App;
