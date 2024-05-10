import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../slices/authSlice';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const dispatch = useDispatch();

  const fetchUserData = async (token) => {
    try {
      const decoded = jwtDecode(token);
      dispatch(setUser(decoded.user));
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      fetchUserData(token);
    }
  }, [dispatch]);

  return (
    <div>
      <a href={process.env.REACT_APP_DISCORD_LOGIN_URL}>Login with Discord</a>
    </div>
  );
};

export default Login;
