import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configurations
import { PATH_NAME } from 'configurations';

import LoginBox from 'components/LoginBox/LoginBox';

import './Login.css';

import { useDispatch } from 'react-redux';
import { setLoading, setUser } from 'store/app/app.slice';
import { loginUser } from 'apis/user.api';
import authService from 'services/authService';
import { mockUser } from 'mock';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);

  const loginHandle = async (event) => {
    event.preventDefault();
    const { email, code } = event.target.elements;
    console.log(email.value, code.value);

    // try {
    //   const bodyData = {
    //     email: email.value,
    //     code: code.value,
    //   };
    //   const res = await loginUser('/user/login', bodyData);
    //   const userData = res.data;
    //   authService.setUserAccess(userData);
    //   dispatch(setUser(userData));
    //   navigate(PATH_NAME.ROOT);
    // } catch (err) {
    //   // do something
    //   const randomUser = mockUser[(mockUser.length * Math.random()) | 0];
    //   dispatch(setUser(randomUser));
    //   dispatch(setLoading(false));
    //   navigate(PATH_NAME.ROOT);
    // }

    dispatch(setLoading(true));
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      const randomUser = mockUser[(mockUser.length * Math.random()) | 0];
      dispatch(setUser(randomUser));
      dispatch(setLoading(false));
      navigate(PATH_NAME.ROOT);
    }, 2000);
  };

  return (
    <div className={`login`}>
      <LoginBox onSubmit={loginHandle} disabled={disabled} />
    </div>
  );
};

export default Login;
