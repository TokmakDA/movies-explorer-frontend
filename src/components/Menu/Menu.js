import React, { useEffect } from 'react';
import './Menu.css';

export const Menu = ({ isOpen, closeMenu, children }) => {
  // указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        closeMenu();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, closeMenu]);
  // создаем обработчик клика на оверлей
  const handleOverlay = (e) => {
    console.log('e.target ===>', e.target);
    console.log('e.currentTarget ===>', e.currentTarget);
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };

  return (
    <div
      className={`menu ${isOpen && 'menu_is-opened'}`}
      onClick={handleOverlay}
    >
      <div className="menu__container">
        <button
          className="menu__exit"
          onClick={() => closeMenu()}
        />
        {children}
      </div>
    </div>
  );
};
