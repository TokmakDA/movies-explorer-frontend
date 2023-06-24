import React, { useEffect } from 'react';
import './Menu.css';
import { Navigation } from '../Navigation/Navigation';

export const Menu = ({ isOpen, setOpen }) => {
  // указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, setOpen]);

  return (
    <div className={`menu ${isOpen && 'menu_is-opened'}`}>
      <div className="menu__container">
        <button
          className="menu__exit"
          onClick={() => setOpen(false)}
        />
        <Navigation
          themeColor={'white'}
          isOpen={isOpen}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};
