import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { useResize } from '../../hooks/useResize';

function Header() {
  const { isScreenLg } = useResize();
  // const [isUserBarOpen, setUserBarOpen] = useState(false);

  const isLoading = true;

  const loginContainer = (
    <nav className="header__login-container">
      <Link className="header__register-link">Регистрация</Link>
      <Link className="header__login-button">Войти</Link>
    </nav>
  );

  //  перенести в Navigation блок настроить на 2 ячейки грида
  // const accountButton = (
  //   <Link className="header__account-button">
  //     <span className="header__button-icon" />
  //     Аккаунт
  //   </Link>
  // );

  const burger = <Link className="header__burger"></Link>;

  return (
    <header className={`header header_color_${isLoading ? 'white' : 'gray'}`}>
      <Link className="header__logo" />
      {isLoading ? (
        isScreenLg ? (
          <>
            <Navigation />
            {/* {accountButton} */}
          </>
        ) : (
          burger
        )
      ) : (
        loginContainer
      )}
    </header>
  );
}

export default Header;
