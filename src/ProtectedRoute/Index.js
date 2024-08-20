import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get('userData');
  if (!accessToken) {
    return <Navigate to="/Login" />;
  }
  return children;
};

export default ProtectedRoute;