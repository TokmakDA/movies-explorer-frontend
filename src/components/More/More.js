import React from 'react';
import './More.css';

function More({ onClick }) {
  return (
    <button
      className="more"
      onClick={onClick}
    >
      Еще
    </button>
  );
}

export default More;
