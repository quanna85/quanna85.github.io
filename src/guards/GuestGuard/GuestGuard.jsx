import React from 'react';
import { Navigate } from 'react-router-dom';

// configurations
import { PATH_NAME } from 'configurations';
import { useSelector } from 'react-redux';

const GuestGuard = ({ children }) => {
  const user = useSelector((state) => state.app.user);
  if (user) return <Navigate to={PATH_NAME.ROOT} />;

  return children;
};

export default GuestGuard;
