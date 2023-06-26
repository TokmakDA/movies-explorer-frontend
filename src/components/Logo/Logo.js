import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
export const Logo = ({ parentClassName }) => {
  return (
    <Link
      to="/"
      className={`logo ${parentClassName}`}
    />
  );
};
