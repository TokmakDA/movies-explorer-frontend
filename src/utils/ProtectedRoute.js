import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isAuthorized, children }) => {
  const location = useLocation();
  const authNav = ['/profile', '/saved-movies', '/movies'].includes(
    location.pathname,
  );
  const unauthNav = ['/signin', '/signup'].includes(location.pathname);

  if (!isAuthorized) {
    if (authNav) {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }
  } else {
    if (unauthNav) {
      return (
        <Navigate
          to="/movies"
          replace
        />
      );
    }
  }

  return children;
};
