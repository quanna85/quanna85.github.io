import React from 'react';
import { Navigate } from 'react-router-dom';

// configurations
import { PATH_NAME } from 'configurations';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
  const user = useSelector((state) => state.app.user);
  if (!user) return <Navigate to={PATH_NAME.LOGIN} />;

  return children;
};

export default AuthGuard;
